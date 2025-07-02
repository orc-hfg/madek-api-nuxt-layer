import type { H3Event } from 'h3';
import type { MadekCollectionMetaDatumPathParameters } from '../../../../../types/collection-meta-datum';
import { createError, getRouterParam } from 'h3';
import { getCollectionMetaDatum } from '../../../../../madek-api-services/collection-meta-datum';
import { isValidRouteParameter } from '../../../../../utils/validation';

export default defineEventHandler(async (event: H3Event) => {
	const collectionId = getRouterParam(event, 'collection_id');
	const metaKeyId = getRouterParam(event, 'meta_key_id');

	if (!isValidRouteParameter(collectionId) || !isValidRouteParameter(metaKeyId)) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing required URL parameters',
		});
	}

	const parameters: MadekCollectionMetaDatumPathParameters = {
		collection_id: collectionId,
		meta_key_id: metaKeyId,
	};

	const collectionMetaDatum = await getCollectionMetaDatum(
		event,
		parameters.collection_id,
		parameters.meta_key_id,
	);

	return collectionMetaDatum;
});
