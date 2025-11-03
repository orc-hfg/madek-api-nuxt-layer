import type { H3Event } from 'h3';
import { fiveMinutesCache } from '../../constants/cache';
import { getFallbackMetaKey, mergeRoles, META_KEYS_SHOULD_TRIM, normalizeKeywords, normalizePeople, shouldReturnEmptyArray, shouldReturnEmptyString } from './normalization';

/*
 * API Service Layer - Collection Meta Datum
 *
 * Responsibility: Data retrieval and normalization
 * - Fetch data from external APIs
 * - Normalize data (null conversion, whitespace trimming, line ending normalization)
 * - Technical filtering: Data structure integrity (null-safety, referential integrity)
 *
 * App Service Layer handles business-logic filtering (e.g., filtering entries with empty display values)
 * See readme.architecture.md for complete architecture documentation
 */

function handleNotFoundError(event: H3Event, collectionId: MadekCollectionMetaDatumPathParameters['collection_id'], metaKeyId: MadekCollectionMetaDatumPathParameters['meta_key_id'], serverLogger: Logger): Promise<CollectionMetaDatum> | CollectionMetaDatum | undefined {
	const fallbackMetaKeyId = getFallbackMetaKey(metaKeyId);
	if (fallbackMetaKeyId !== undefined) {
		serverLogger.warn(`Meta key ${metaKeyId} returned 404, trying fallback meta key ${fallbackMetaKeyId}.`);

		return getCollectionMetaDatum(event, collectionId, fallbackMetaKeyId);
	}

	if (shouldReturnEmptyString(metaKeyId)) {
		serverLogger.warn(`Meta key ${metaKeyId} returned 404, returning empty string instead.`);

		return {
			string: '',
		};
	}

	if (shouldReturnEmptyArray(metaKeyId)) {
		serverLogger.warn(`Meta key ${metaKeyId} returned 404, returning empty data instead.`);

		return {
			string: '',
			people: [],
			keywords: [],
			roles: [],
		};
	}

	return undefined;
}

export async function getCollectionMetaDatum(event: H3Event, collectionId: MadekCollectionMetaDatumPathParameters['collection_id'], metaKeyId: MadekCollectionMetaDatumPathParameters['meta_key_id']): Promise<CollectionMetaDatum> {
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekCollectionMetaDatumResponse>(event);
	const serverLogger = createServerLogger(event, 'API Service: getCollectionMetaDatum');

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
			string: normalizeTextContent(response['meta-data'].string, META_KEYS_SHOULD_TRIM.has(metaKeyId)),

			...(response.people && {
				people: normalizePeople(response.people),
			}),

			...(response.keywords && {
				keywords: normalizeKeywords(response.keywords),
			}),

			...(response.md_roles && response.roles && {
				roles: mergeRoles(response.md_roles, response.roles),
			}),
		};
	}
	catch (error) {
		if (isH3NotFoundError(error)) {
			const result = handleNotFoundError(event, collectionId, metaKeyId, serverLogger);

			if (result !== undefined) {
				return result;
			}
		}

		return handleServiceError(serverLogger, error, 'Failed to fetch collection meta datum.');
	}
}
