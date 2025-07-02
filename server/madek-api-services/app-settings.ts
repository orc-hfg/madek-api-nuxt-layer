import type { H3Event } from 'h3';
import type { AppSettings, MadekAppSettingsResponse } from '../types/app-settings';
import { StatusCodes } from 'http-status-codes';
import { defaultCache } from '../constants/cache';

export async function getAppSettings(event: H3Event): Promise<AppSettings> {
	const runtimeConfig = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekAppSettingsResponse>(event);
	const logger = createLogger(event);

	logger.info('API service: getAppSettings', 'API baseURL:', runtimeConfig.public.madekApi.baseURL);

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
		const errorMessage = 'Failed to fetch app settings.';

		logger.error('API service: getAppSettings', errorMessage, error);

		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: errorMessage,
		});
	}
}
