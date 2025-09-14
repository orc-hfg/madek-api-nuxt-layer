import type { H3Event } from 'h3';
import { getCollectionMetaDatum } from '../../../../../madek-api-services/collection-meta-datum';
import { routeParameterSchemas } from '../../../../../schemas/route';

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
	const parameters = await validateRouteParameters(event, routeParameterSchemas.collectionMetaDatum);

	const pathParameters: MadekCollectionMetaDatumPathParameters = {
		collection_id: parameters.collection_id,
		meta_key_id: parameters.meta_key_id,
	};

	try {
		return await getCollectionMetaDatum(
			event,
			pathParameters.collection_id,
			pathParameters.meta_key_id,
		);
	}
	catch (error: unknown) {
		const fallbackMetaKeyId = META_KEY_FALLBACKS[parameters.meta_key_id];
		if (isH3NotFoundError(error) && fallbackMetaKeyId) {
			return getCollectionMetaDatum(
				event,
				pathParameters.collection_id,
				fallbackMetaKeyId,
			);
		}

		throw error;
	}
});
