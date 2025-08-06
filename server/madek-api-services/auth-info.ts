import type { H3Event } from 'h3';
import type { AuthInfo, MadekAuthInfoResponse } from '../types/auth-info';
import { noCache } from '../constants/cache';
import { createServerLogger } from '../utils/server-logger';

export async function getAuthInfo(event: H3Event): Promise<AuthInfo> {
	const config = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekAuthInfoResponse>(event);
	const serverLogger = createServerLogger(event, 'Service: getAuthInfo');

	serverLogger.info('API baseURL:', config.public.madekApi.baseURL);

	try {
		const response = await fetchFromApi('auth-info', {
			apiOptions: {
				isAuthenticationNeeded: true,
			},
			publicDataCache: noCache,
		});

		return {
			id: response.id,
			login: response.login,
			first_name: response.first_name,
			last_name: response.last_name,
		};
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch auth info.');
	}
}
