import type { AuthInfo } from '../../server/types/auth-info';
import type { ApiFunction } from '../types/api';

interface UserRepository {
	getAuthInfo: () => Promise<AuthInfo>;
}

function createUserRepository($madekApi: ApiFunction): UserRepository {
	return {
		async getAuthInfo(): Promise<AuthInfo> {
			// hier wären RequestOptions nötig
			return $madekApi('/auth-info', {
				// anti crsf
			});
		},
	};
}

export function getUserRepository(): UserRepository {
	const { $madekApi } = useNuxtApp();

	return createUserRepository($madekApi as ApiFunction);
}
