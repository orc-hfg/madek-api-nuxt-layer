import type { H3Event } from 'h3';
import { twentyFourHoursCache } from '../constants/cache';

export async function getAppSettings(event: H3Event): Promise<AppSettings> {
	const { fetchFromApi } = createMadekApiClient<MadekAppSettingsResponse>(event);
	const serverLogger = createServerLogger(event, 'Service: getAppSettings');

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
