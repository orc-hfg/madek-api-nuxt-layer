import type { Collection } from '../../shared/types/api/collections';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { getSetRepository } from '../utils/set-repository';
import { useUserStore } from './user';

export const useUserSetsStore = defineStore('user-sets', () => {
	const isInitialized = ref(false);
	const sets = ref<Collection[]>([]);

	async function fetchData(): Promise<void> {
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

		await fetchData();
		isInitialized.value = true;
	}

	return {
		sets,
		fetchData,
		initialize,
	};
});

// https://pinia.vuejs.org/cookbook/hot-module-replacement.html
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserSetsStore, import.meta.hot));
}
