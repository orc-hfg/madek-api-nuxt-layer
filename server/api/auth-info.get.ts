import type { H3Event } from 'h3';
import { mockData } from '../madek-api-mock/data';
import { getAuthInfo } from '../madek-api-services/auth-info';

export default defineEventHandler(async (event: H3Event) => getApiMockOrExecute(
	event,
	'API: auth-info',
	'Returning mock: auth-info',
	undefined,
	() => mockData.getAuthInfo(),
	async () => getAuthInfo(event),
));
