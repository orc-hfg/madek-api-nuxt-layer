import type { H3Event } from 'h3';
import type { MadekCollectionMetaDatumPathParameters } from '../../../../../types/collection-meta-datum';
import { StatusCodes } from 'http-status-codes';
import { getCollectionMetaDatum } from '../../../../../madek-api-services/collection-meta-datum';
import { isH3NotFoundError } from '../../../../../utils/error-handling';

/*
 * Fallback rules for set title meta keys used by API routes
 * When a requested meta key returns 404, try the fallback meta key instead
 * Example: 'creative_work:title_en' (English) → 'madek_core:title' (German fallback)
 */
const SET_TITLE_META_KEY_FALLBACKS: Record<string, string> = {
	'creative_work:title_en': 'madek_core:title',
};

// Combine all fallback rules for this API route
const META_KEY_FALLBACKS: Record<string, string> = {
	...SET_TITLE_META_KEY_FALLBACKS,
};

export default defineEventHandler(async (event: H3Event) => {
	const collectionId = getRouterParam(event, 'collection_id');
	const metaKeyId = getRouterParam(event, 'meta_key_id');

	if (!isValidRouteParameter(collectionId) || !isValidRouteParameter(metaKeyId)) {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: 'Missing required URL parameters.',
		});
	}

	const pathParameters: MadekCollectionMetaDatumPathParameters = {
		collection_id: collectionId,
		meta_key_id: metaKeyId,
	};

	try {
		return await getCollectionMetaDatum(
			event,
			pathParameters.collection_id,
			pathParameters.meta_key_id,
		);
	}
	catch (error: unknown) {
		if (isH3NotFoundError(error) && META_KEY_FALLBACKS[metaKeyId]) {
			const fallbackMetaKeyId = META_KEY_FALLBACKS[metaKeyId];

			return getCollectionMetaDatum(
				event,
				pathParameters.collection_id,
				fallbackMetaKeyId,
			);
		}

		throw error;
	}
});
