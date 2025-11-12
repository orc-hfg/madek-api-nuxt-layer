import type { H3Event } from 'h3';
import { noCache } from '../../constants/cache';
import { getFallbackMetaKey, META_KEYS_SHOULD_TRIM, shouldReturnEmptyString } from './normalization';

function handleNotFoundError(event: H3Event, mediaEntryId: MadekMediaEntryMetaDatumPathParameters['media_entry_id'], metaKeyId: MadekMediaEntryMetaDatumPathParameters['meta_key_id'], serverLogger: Logger): Promise<MediaEntryMetaDatum | undefined> | MediaEntryMetaDatum | undefined {
	const fallbackMetaKeyId = getFallbackMetaKey(metaKeyId);
	if (fallbackMetaKeyId !== undefined) {
		serverLogger.warn(`Meta key ${metaKeyId} returned 404, trying fallback meta key ${fallbackMetaKeyId}.`);

		return getMediaEntryMetaDatum(event, mediaEntryId, fallbackMetaKeyId);
	}

	if (shouldReturnEmptyString(metaKeyId)) {
		serverLogger.warn(`Meta key ${metaKeyId} returned 404, returning empty string instead.`);

		return {
			string: '',
		};
	}

	return undefined;
}

export async function getMediaEntryMetaDatum(event: H3Event, mediaEntryId: MadekMediaEntryMetaDatumPathParameters['media_entry_id'], metaKeyId: MadekMediaEntryMetaDatumPathParameters['meta_key_id']): Promise<MediaEntryMetaDatum | undefined> {
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekMediaEntryMetaDatumResponse>(event);
	const serverLogger = createServerLogger(event, 'API Service: getMediaEntryMetaDatum');

	serverLogger.info('Media Entry ID:', mediaEntryId);
	serverLogger.info('Meta Key ID:', metaKeyId);

	try {
		const response = await fetchFromApiWithPathParameters(
			'media-entry/:mediaEntryId/meta-datum/:metaKeyId',
			{
				mediaEntryId,
				metaKeyId,
			},
			{
				apiOptions: {
					isAuthenticationNeeded: true,
				},
				publicDataCache: noCache,
			},
		);

		return {
			string: normalizeTextContent(response['meta-data'].string, META_KEYS_SHOULD_TRIM.has(metaKeyId)),
		};
	}
	catch (error) {
		/*
		 * Handle 401 Unauthorized: User doesn't have permission to access this media entry
		 * Return undefined to signal that this media entry should be filtered out completely
		 */
		if (isH3UnauthorizedError(error)) {
			serverLogger.warn(`Media entry ${mediaEntryId} meta-datum ${metaKeyId} returned 401, returning undefined to filter out media entry.`);

			return undefined;
		}

		if (isH3NotFoundError(error)) {
			const result = handleNotFoundError(event, mediaEntryId, metaKeyId, serverLogger);

			if (result !== undefined) {
				return result;
			}
		}

		return handleServiceError(serverLogger, error, 'Failed to fetch media entry meta datum.');
	}
}
