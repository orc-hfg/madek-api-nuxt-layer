import type { H3Event } from 'h3';
import { fiveMinutesCache } from '../constants/cache';
import { handleServiceError, isH3NotFoundError } from '../utils/error-handling';
import { createMadekApiClient } from '../utils/madek-api';

/*
 * Fallback rules for set title meta keys
 * When a requested meta key returns 404, try the fallback meta key instead
 * Example: 'creative_work:title_en' (English) → 'madek_core:title' (German fallback)
 */
const SET_TITLE_META_KEY_FALLBACKS: Record<MadekCollectionMetaDatumPathParameters['meta_key_id'], MadekCollectionMetaDatumPathParameters['meta_key_id']> = {
	'creative_work:title_en': 'madek_core:title',
};

/*
 * Meta keys that should return empty string instead of throwing 404 error
 * When a requested meta key returns 404, return empty string instead
 */
const META_KEYS_RETURN_EMPTY_ON_404 = new Set<MadekCollectionMetaDatumPathParameters['meta_key_id']>([
	'creative_work:description_en',
	'creative_work:subtitle_en',
	'madek_core:description',
	'madek_core:subtitle',
]);

/*
 * Meta keys where leading/trailing whitespace should be trimmed
 *
 * Trimming is applied to structured short text fields (titles, subtitles) to ensure
 * clean display in UI components. Description fields are NOT trimmed to preserve
 * intentional formatting and line breaks in longer text content.
 *
 * Trimmed fields: title, subtitle
 * Non-trimmed fields: description
 */
const META_KEYS_SHOULD_TRIM = new Set<MadekCollectionMetaDatumPathParameters['meta_key_id']>([
	'creative_work:subtitle_en',
	'creative_work:title_en',
	'madek_core:subtitle',
	'madek_core:title',
]);

export async function getCollectionMetaDatum(event: H3Event, collectionId: MadekCollectionMetaDatumPathParameters['collection_id'], metaKeyId: MadekCollectionMetaDatumPathParameters['meta_key_id']): Promise<CollectionMetaDatum> {
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekCollectionMetaDatumResponse>(event);
	const serverLogger = createServerLogger(event, 'Service: getCollectionMetaDatum');

	serverLogger.info('Collection ID:', collectionId);
	serverLogger.info('Meta Key ID:', metaKeyId);

	try {
		const response = await fetchFromApiWithPathParameters(
			'collection/:collectionId/meta-datum/:metaKeyId',
			{
				collectionId,
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
			// Normalize line endings and conditionally trim based on meta key type
			string: normalizeTextContent(
				response['meta-data'].string,
				META_KEYS_SHOULD_TRIM.has(metaKeyId),
			),
		};
	}
	catch (error) {
		if (isH3NotFoundError(error)) {
			// Check if this meta key should return empty string on 404
			if (META_KEYS_RETURN_EMPTY_ON_404.has(metaKeyId)) {
				serverLogger.warn(`Meta key ${metaKeyId} returned 404, returning empty string instead.`);

				return {
					string: '',
				};
			}

			// Check for fallback meta key
			const fallbackMetaKeyId = SET_TITLE_META_KEY_FALLBACKS[metaKeyId];
			if (fallbackMetaKeyId) {
				serverLogger.warn(`Meta key ${metaKeyId} returned 404, trying fallback meta key ${fallbackMetaKeyId}.`);

				return getCollectionMetaDatum(event, collectionId, fallbackMetaKeyId);
			}
		}

		return handleServiceError(serverLogger, error, 'Failed to fetch collection meta datum.');
	}
}
