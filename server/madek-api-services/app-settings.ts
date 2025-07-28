import type { H3Event } from 'h3';
import type { AppSettings, MadekAppSettingsResponse } from '../types/app-settings';
import { twentyFourHoursCache } from '../constants/cache';

export async function getAppSettings(event: H3Event): Promise<AppSettings> {
	const config = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekAppSettingsResponse>(event);
	const logger = createLogger(event);

	logger.info('Service: getAppSettings', 'API baseURL:', config.public.madekApi.baseURL);

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
		return handleServiceError(error, 'getAppSettings', logger, 'Failed to fetch app settings.');
	}
}
