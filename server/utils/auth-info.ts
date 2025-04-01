import type { H3Event } from 'h3';
import type { AuthInfo, MadekAuthInfoResponse } from '../../shared/types/api/auth-info';
import { StatusCodes } from 'http-status-codes';
import { freshOneHourCache } from './constants';
import { createMadekApiClient } from './madek-api';

export async function getAuthInfo(event: H3Event): Promise<AuthInfo> {
	const { fetchFromApi } = createMadekApiClient<MadekAuthInfoResponse>(event);

	try {
		const response = await fetchFromApi('/auth-info', {
			apiOptions: {
				needsAuth: true,
			},
			cache: freshOneHourCache,
		});

		return {
			id: response.id,
			login: response.login,
			first_name: response.first_name,
			last_name: response.last_name,
		};
	}
	catch {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: 'Failed to fetch auth info.',
		});
	}
}
