import type { H3Event } from 'h3';
import { useMadekApi } from '../../composables/useMadekApi';
import type { AuthInfo } from '../../schemas/auth-info';

export const getAuthInfo = async (event: H3Event): Promise<AuthInfo> => {
	const { fetchFromApi } = useMadekApi(event);
	const result = await fetchFromApi<AuthInfo>('/auth-info', {
		needsAuth: true,
		cache: {
			maxAge: 60 * 60,
			swr: false,
		},
	});

	return {
		id: result.id,
		first_name: result.first_name,
		last_name: result.last_name,
	};
};
