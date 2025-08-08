import type { H3Event } from 'h3';
import type { MadekCollectionMetaDatumPathParameters } from '../../../../../types/collection-meta-datum';
import { StatusCodes } from 'http-status-codes';
import { getCollectionMetaDatum } from '../../../../../madek-api-services/collection-meta-datum';

export default defineEventHandler(async (event: H3Event) => {
	const collectionId = getRouterParam(event, 'collection_id');
	const metaKeyId = getRouterParam(event, 'meta_key_id');

	if (!isValidRouteParameter(collectionId) || !isValidRouteParameter(metaKeyId)) {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: 'Missing required URL parameters',
		});
	}

	const pathParameters: MadekCollectionMetaDatumPathParameters = {
		collection_id: collectionId,
		meta_key_id: metaKeyId,
	};

	const collectionMetaDatum = await getCollectionMetaDatum(
		event,
		pathParameters.collection_id,
		pathParameters.meta_key_id,
	);

	return collectionMetaDatum;
});
