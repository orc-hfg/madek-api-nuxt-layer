import type { H3Event } from 'h3';
import { mockData } from '../madek-api-mock/data';
import { getCollections } from '../madek-api-services/collections';
import { getApiMockOrExecute } from '../madek-api-services/mock-handler';
import { routeQuerySchemas } from '../schemas/madek-api-route';

export default defineEventHandler(async (event: H3Event) => {
	const query = await validateQueryParameters(event, routeQuerySchemas.collections);

	return getApiMockOrExecute(
		event,
		'API: collections',
		'Returning mock: collections',
		{ responsible_user_id: query.responsible_user_id, filter_by: query.filter_by },
		() => mockData.getCollections(query),
		async () => getCollections(event, query),
	);
});
