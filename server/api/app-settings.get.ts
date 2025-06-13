import type { H3Event } from 'h3';
import { getAppSettings } from '../madek-api-services/app-settings';

export default defineEventHandler(async (event: H3Event) => {
	const appSettings = await getAppSettings(event);

	return appSettings;
});
