import type { H3Event } from 'h3';
import type { AppSettings, MadekAppSettingsResponse } from '../types/app-settings';
import { defaultCache } from '../constants/cache';
import { createLogger } from '../utils/logger';
import { createMadekApiClient } from '../utils/madek-api';

export async function getAppSettings(event: H3Event): Promise<AppSettings> {
	const config = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekAppSettingsResponse>(event);
	const logger = createLogger(event);

	logger.info('Service: getAppSettings', 'API baseURL:', config.public.madekApi.baseURL);

	try {
		const response = await fetchFromApi('app-settings', {
			apiOptions: {
				needsAuth: false,
			},
			publicDataCache: defaultCache,
		});

		return {
			default_locale: response.default_locale,
		};
	}
	catch (error) {
		return handleServiceError(error, logger, 'getAppSettings', 'Failed to fetch app settings.');
	}
}
