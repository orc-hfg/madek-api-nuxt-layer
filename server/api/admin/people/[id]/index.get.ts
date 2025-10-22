import type { H3Event } from 'h3';
import { mockData } from '../../../../madek-api-mock/data';
import { getAdminPerson } from '../../../../madek-api-services/admin-people';
import { routeParameterSchemas } from '../../../../schemas/madek-api-route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.personId);

	const pathParameters: MadekAdminPeopleGetPathParameters = {
		id: parameters.id,
	};

	return getApiMockOrExecute(
		event,
		'API: admin-people',
		'Returning mock: admin-people',
		{ id: pathParameters.id },
		() => mockData.getAdminPerson(pathParameters.id),
		async () => getAdminPerson(event, pathParameters.id),
	);
});
