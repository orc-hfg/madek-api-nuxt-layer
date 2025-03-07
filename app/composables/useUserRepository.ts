import type { AuthInfo } from '../../shared/types/api/auth-info';

interface UserRepository {
	getAuthInfo: () => Promise<AuthInfo>;
}

interface ApiInstance {
	<T>(url: string, options?: any): Promise<T>;
}

function createUserRepository($api: ApiInstance): UserRepository {
	return {
		async getAuthInfo(): Promise<AuthInfo> {
			return $api('/auth-info');
		},
	};
}

export function useUserRepository(): UserRepository {
	const { $api } = useNuxtApp();
	return createUserRepository($api);
}
