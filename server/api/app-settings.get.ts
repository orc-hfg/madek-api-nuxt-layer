import type { H3Event } from 'h3';
import { mockData } from '../madek-api-mock/data';
import { getApiMockOrExecute } from '../madek-api-mock/handler';
import { getAppSettings } from '../madek-api-services/app-settings';

export default defineEventHandler(async (event: H3Event) => getApiMockOrExecute(
	event,
	'API: app-settings',
	'Returning mock: app-settings',
	undefined,
	() => mockData.getAppSettings(),
	async () => getAppSettings(event),
));
