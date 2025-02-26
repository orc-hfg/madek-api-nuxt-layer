import type { H3Event } from 'h3';
import type { AuthInfo, MadekAuthInfoResponse } from '../../schemas/auth-info';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { useMadekApi } from '../../composables/useMadekApi';

export async function getAuthInfo(event: H3Event): Promise<AuthInfo> {
	const { fetchFromApi } = useMadekApi(event);

	try {
		const response = await fetchFromApi<MadekAuthInfoResponse>('/auth-info', {
			needsAuth: true,
			cache: {
				maxAge: 60 * 60,
				swr: false,
			},
		});

		return {
			id: response.id,
			login: response.login,
			first_name: response.first_name,
			last_name: response.last_name,
		};
	} catch {
		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
			message: 'Failed to fetch auth info',
		});
	}
}
