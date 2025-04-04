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
	catch {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Failed to fetch app settings.',
		});
	}
}
