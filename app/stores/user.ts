export const useUserStore = defineStore('user', () => {
	const id = shallowRef<AuthInfo['id']>();
	const login = shallowRef<AuthInfo['login']>();
	const firstName = shallowRef<AuthInfo['first_name']>();
	const lastName = shallowRef<AuthInfo['last_name']>();
	const displayName = computed(() => {
		if (firstName.value !== undefined && firstName.value !== ''
			&& lastName.value !== undefined && lastName.value !== '') {
			return `${firstName.value} ${lastName.value}`;
		}

		return '';
	});

	async function refresh(): Promise<void> {
		const userRepository = getUserRepository();
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
		refresh,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
