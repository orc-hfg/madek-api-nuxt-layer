import type { Collection } from '../../shared/types/api/collections';
import { getSetRepository } from '../utils/set-repository';

export const useUserSetsStore = defineStore('user-sets', () => {
	const isInitialized = shallowRef(false);
	const sets = shallowRef<Collection[]>([]);

	async function refreshData(): Promise<void> {
		const userStore = useUserStore();
		const setRepository = getSetRepository();

		if (userStore.id === undefined) {
			await userStore.initialize();
		}

		const userId = userStore.id;
		if (userId !== undefined) {
			const data = await setRepository.getSets({ responsible_user_id: userId });
			sets.value = data;
		}
	}

	async function initialize(): Promise<void> {
		if (isInitialized.value) {
			return;
		}

		await refreshData();
		isInitialized.value = true;
	}

	return {
		sets,
		refreshData,
		initialize,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserSetsStore, import.meta.hot));
}
