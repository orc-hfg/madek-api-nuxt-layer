import type { H3Event } from 'h3';
import type { AppSettings, MadekAppSettingsResponse } from '../../shared/types/api/app-settings';
import { StatusCodes } from 'http-status-codes';
import { defaultCache } from '../constants/cache';
import { createMadekApiClient } from './madek-api';

export async function getAppSettings(event: H3Event): Promise<AppSettings> {
	const { fetchFromApi } = createMadekApiClient<MadekAppSettingsResponse>(event);

	try {
		const response = await fetchFromApi('/app-settings', {
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
		// Log detailed error information to the server logs
		console.error('[getAppSettings] Failed with error:', error);

		// Get more details if it's a FetchError
		if (error instanceof Error) {
			console.error('[getAppSettings] Error message:', error.message);
			console.error('[getAppSettings] Error stack:', error.stack);
		}

		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Failed to fetch app settings.',
		});
	}
}
