import type { H3Event } from 'h3';
import type { AppSettings, MadekAppSettingsResponse } from '../types/app-settings';
import { twentyFourHoursCache } from '../constants/cache';
import { createServerLogger } from '../utils/server-logger';

export async function getAppSettings(event: H3Event): Promise<AppSettings> {
	const config = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekAppSettingsResponse>(event);
	const serverLogger = createServerLogger(event, 'Service: getAppSettings');

	serverLogger.info('API baseURL:', config.public.madekApi.baseURL);

	try {
		const response = await fetchFromApi('app-settings', {
			apiOptions: {
				isAuthenticationNeeded: false,
			},
			publicDataCache: twentyFourHoursCache,
		});

		return {
			default_locale: response.default_locale,
		};
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch app settings.');
	}
}
