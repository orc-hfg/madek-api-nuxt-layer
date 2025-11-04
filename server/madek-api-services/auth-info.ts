import type { H3Event } from 'h3';
import { noCache } from '../constants/cache';

export async function getAuthInfo(event: H3Event): Promise<AuthInfo> {
	const { fetchFromApi } = createMadekApiClient<MadekAuthInfoResponse>(event);
	const serverLogger = createServerLogger(event, 'API Service: getAuthInfo');

	try {
		const response = await fetchFromApi('auth-info', {
			apiOptions: {
				isAuthenticationNeeded: true,
			},
			publicDataCache: noCache,
		});

		return {
			id: toUserId(response.id),
			login: normalizeTextContent(response.login, true),
			first_name: normalizeTextContent(response.first_name, true),
			last_name: normalizeTextContent(response.last_name, true),
		};
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch authenticated info.');
	}
}
