import type { MetaDatum } from '../../server/types/collection-meta-datum';
import type { Collection } from '../../server/types/collections';
import { getSetRepository } from '../repositories/set';
import { getSetsRepository } from '../repositories/sets';

export const useUserSetsStore = defineStore('user-sets', () => {
	const isInitialized = shallowRef(false);
	const sets = shallowRef<Collection[]>([]);
	const setTitles = shallowRef<MetaDatum[]>([]);

	async function refreshData(): Promise<void> {
		const userStore = useUserStore();
		const setsRepository = getSetsRepository();
		const setRepository = getSetRepository();

		if (userStore.id === undefined) {
			await userStore.initialize();
		}

		const userId = userStore.id;
		if (userId !== undefined) {
			const data = await setsRepository.getSets(
				{
					responsible_user_id: userId,
					filter_by: JSON.stringify({
						meta_data: [
							{
								key: 'settings:is_node',
							},
						],
					}),
				},
			);
			sets.value = data;

			setTitles.value = await setRepository.getSetTitles(
				sets.value.map(set => set.id),
			);
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
		setTitles,
		refreshData,
		initialize,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserSetsStore, import.meta.hot));
}
