import type { H3Event } from 'h3';
import type { AuthInfo, MadekAuthInfoResponse } from '../types/auth-info';
import { noCache } from '../constants/cache';
import { handleServiceError } from '../utils/error-handling';
import { createLogger } from '../utils/logger';
import { createMadekApiClient } from '../utils/madek-api';

export async function getAuthInfo(event: H3Event): Promise<AuthInfo> {
	const runtimeConfig = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekAuthInfoResponse>(event);
	const logger = createLogger(event);

	logger.info('Service: getAuthInfo', 'API baseURL:', runtimeConfig.public.madekApi.baseURL);

	try {
		const response = await fetchFromApi('auth-info', {
			apiOptions: {
				needsAuth: true,
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
		return handleServiceError(error, logger, 'getAuthInfo', 'Failed to fetch auth info.');
	}
}
