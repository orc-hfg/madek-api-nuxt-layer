import type { H3Event } from 'h3';
import { mockData } from '../../../../../madek-api-mock/data';
import { getCollectionMetaDatum } from '../../../../../madek-api-services/collection-meta-datum';
import { routeParameterSchemas } from '../../../../../schemas/madek-api-route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.collectionMetaDatum);

	const pathParameters: MadekCollectionMetaDatumPathParameters = {
		collection_id: parameters.collection_id,
		meta_key_id: parameters.meta_key_id,
	};

	return getApiMockOrExecute(
		event,
		'API: collection meta-datum',
		'Returning mock: collection meta-datum',
		{ collectionId: pathParameters.collection_id, metaKeyId: pathParameters.meta_key_id },
		() => mockData.getCollectionMetaDatum(pathParameters.collection_id, pathParameters.meta_key_id),
		async () => getCollectionMetaDatum(event, pathParameters.collection_id, pathParameters.meta_key_id),
	);
});
