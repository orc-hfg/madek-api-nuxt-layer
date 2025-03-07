import type { AuthInfo } from '../../shared/types/api/auth-info';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { useUserRepository } from '../composables/useUserRepository';

export const useUserStore = defineStore('user', () => {
	const id = ref<AuthInfo['id']>();
	const login = ref<AuthInfo['login']>();
	const firstName = ref<AuthInfo['first_name']>();
	const lastName = ref<AuthInfo['last_name']>();

	const displayName = computed(() => {
		return `${firstName.value} ${lastName.value}`;
	});

	const userRepository = useUserRepository();

	async function fetchData(): Promise<void> {
		const data = await userRepository.getAuthInfo();

		id.value = data.id;
		login.value = data.login;
		firstName.value = data.first_name;
		lastName.value = data.last_name;
	}

	return {
		id,
		login,
		firstName,
		lastName,
		displayName,
		fetchData,
	};
});

// https://pinia.vuejs.org/cookbook/hot-module-replacement.html
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
