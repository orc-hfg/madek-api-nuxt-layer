import type { H3Event } from 'h3';
import { mockData } from '../../madek-api-mock/data';
import { getApiMockOrExecute } from '../../madek-api-mock/handler';
import { getContext } from '../../madek-api-services/contexts';
import { routeParameterSchemas } from '../../schemas/madek-api-route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.contextId);

	const pathParameters: MadekContextsGetPathParameters = {
		id: parameters.id,
	};

	return getApiMockOrExecute(
		event,
		'API: context',
		'Returning mock: context',
		{ contextId: pathParameters.id },
		() => mockData.getContext(pathParameters.id),
		async () => getContext(event, pathParameters.id),
	);
});
