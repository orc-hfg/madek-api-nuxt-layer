import type { H3Event } from 'h3';
import { mockData } from '../../../madek-api-mock/data';
import { getMetaKeyLabels } from '../../../madek-api-services/meta-keys';
import { routeParameterSchemas } from '../../../schemas/madek-api-route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.metaKeysId);

	const pathParameters: MadekMetaKeysGetPathParameters = {
		id: parameters.id,
	};

	return getApiMockOrExecute(
		event,
		'API: meta-keys',
		'Returning mock: meta-keys',
		{ id: pathParameters.id },
		() => mockData.getMetaKeyLabels(pathParameters.id),
		async () => getMetaKeyLabels(event, pathParameters.id),
	);
});
