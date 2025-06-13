import type { H3Event } from 'h3';
import type { AppSettings, MadekAppSettingsResponse } from '../../shared/types/api/app-settings';
import { StatusCodes } from 'http-status-codes';
import { defaultCache } from '../constants/cache';
import { createDebugLogger } from '../utils/debug-logger';
import { createMadekApiClient } from '../utils/madek-api';

export async function getAppSettings(event: H3Event): Promise<AppSettings> {
	const runtimeConfig = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekAppSettingsResponse>(event);
	const logger = createDebugLogger(event);

	logger.info('getAppSettings', 'API baseURL:', runtimeConfig.public.madekApi.baseURL);

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

		logger.error('getAppSettings', errorMessage, error);

		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: errorMessage,
		});
	}
}
