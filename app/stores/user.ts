import type { UserDisplayData } from '../services/user';
import { getUserService } from '../services/user';

export const useUserStore = defineStore('user', () => {
	const userDisplayData = shallowRef<UserDisplayData | undefined>();

	async function refresh(): Promise<void> {
		const userService = getUserService();

		userDisplayData.value = await userService.getUserDisplayData();
	}

	return {
		userDisplayData,
		refresh,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
