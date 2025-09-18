import type { H3Event } from 'h3';
import { mockData } from '../../../../madek-api-mock/data';
import { getApiMockOrExecute } from '../../../../madek-api-mock/handler';
import { getCollectionMediaEntryArcs } from '../../../../madek-api-services/collection-media-entry-arcs';
import { routeParameterSchemas } from '../../../../schemas/madek-api-route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.collectionId);

	const pathParameters: MadekCollectionMediaEntryArcsPathParameters = {
		collection_id: parameters.collection_id,
	};

	return getApiMockOrExecute(
		event,
		'API: collection media-entry-arcs',
		'Returning mock: collection media-entry-arcs',
		{ collectionId: pathParameters.collection_id },
		() => mockData.getCollectionMediaEntryArcs(pathParameters.collection_id),
		async () => getCollectionMediaEntryArcs(event, pathParameters.collection_id),
	);
});
