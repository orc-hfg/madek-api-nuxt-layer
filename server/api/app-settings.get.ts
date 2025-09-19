import type { H3Event } from 'h3';
import { mockData } from '../madek-api-mock/data';
import { getAppSettings } from '../madek-api-services/app-settings';
import { getApiMockOrExecute } from '../madek-api-services/mock-handler';

export default defineEventHandler(async (event: H3Event) => getApiMockOrExecute(
	event,
	'API: app-settings',
	'Returning mock: app-settings',
	undefined,
	() => mockData.getAppSettings(),
	async () => getAppSettings(event),
));
