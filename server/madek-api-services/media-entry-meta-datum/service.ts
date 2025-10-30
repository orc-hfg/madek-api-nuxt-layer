import type { H3Event } from 'h3';
import { fiveMinutesCache } from '../../constants/cache';
import { getFallbackMetaKey, META_KEYS_SHOULD_TRIM, shouldReturnEmptyString } from './normalization';

export async function getMediaEntryMetaDatum(event: H3Event, mediaEntryId: MadekMediaEntryMetaDatumPathParameters['media_entry_id'], metaKeyId: MadekMediaEntryMetaDatumPathParameters['meta_key_id']): Promise<MediaEntryMetaDatum> {
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
					isAuthenticationNeeded: false,
				},
				publicDataCache: fiveMinutesCache,
			},
		);

		return {
			string: normalizeTextContent(
				response['meta-data'].string,
				META_KEYS_SHOULD_TRIM.has(metaKeyId),
			),
		};
	}
	catch (error) {
		if (isH3NotFoundError(error)) {
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
		}

		return handleServiceError(serverLogger, error, 'Failed to fetch media entry meta datum.');
	}
}
