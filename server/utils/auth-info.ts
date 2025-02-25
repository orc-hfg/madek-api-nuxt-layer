import type { H3Event } from 'h3';
import { useMadekApi } from '../../composables/useMadekApi';
import type { MadekAuthInfoResponse, MadekAuthInfoData, AuthInfo } from '../../schemas/auth-info';

export const getAuthInfo = async (event: H3Event): Promise<AuthInfo> => {
	const { fetchFromApi } = useMadekApi(event);
	const response = await fetchFromApi<MadekAuthInfoResponse>('/auth-info', {
		needsAuth: true,
		cache: {
			maxAge: 60 * 60,
			swr: false,
		},
	});

	const data: MadekAuthInfoData = response.data;

	return {
		id: data.id,
		first_name: data.first_name,
		last_name: data.last_name,
	};
};
