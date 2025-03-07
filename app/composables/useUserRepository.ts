import type { AuthInfo } from '../../shared/types/api/auth-info';

interface UserRepository {
	getAuthInfo: () => Promise<AuthInfo>;
}

export function useUserRepository(): UserRepository {
	return {
		async getAuthInfo(): Promise<AuthInfo> {
			return $fetch('/api/auth-info');
		},
	};
}
