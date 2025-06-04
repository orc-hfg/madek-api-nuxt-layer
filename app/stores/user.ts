import type { AuthInfo } from '../../shared/types/api/auth-info';
import { getUserRepository } from '../utils/user-repository';

export const useUserStore = defineStore('user', () => {
	const isInitialized = shallowRef(false);
	const id = shallowRef<AuthInfo['id']>();
	const login = shallowRef<AuthInfo['login']>();
	const firstName = shallowRef<AuthInfo['first_name']>();
	const lastName = shallowRef<AuthInfo['last_name']>();
	const displayName = computed(() => `${firstName.value} ${lastName.value}`);

	async function refreshData(): Promise<void> {
		const userRepository = getUserRepository();
		const data = await userRepository.getAuthInfo();

		id.value = data.id;
		login.value = data.login;
		firstName.value = data.first_name;
		lastName.value = data.last_name;
	}

	async function initialize(): Promise<void> {
		if (isInitialized.value) {
			return;
		}

		await refreshData();
		isInitialized.value = true;
	}

	return {
		id,
		login,
		firstName,
		lastName,
		displayName,
		refreshData,
		initialize,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
