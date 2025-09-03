import type { MetaDatum } from '../../server/types/collection-meta-datum';
import type { Collection } from '../../server/types/collections';
import type { AppLocale } from '../types/i18n-locales';
import { getSetRepository } from '../repositories/set';
import { getSetsRepository } from '../repositories/sets';

export const useUserSetsStore = defineStore('user-sets', () => {
	const sets = shallowRef<Collection[]>([]);
	const setTitles = shallowRef<MetaDatum[]>([]);

	async function refreshData(appLocale: AppLocale): Promise<void> {
		const userStore = useUserStore();
		const setsRepository = getSetsRepository();
		const setRepository = getSetRepository();

		const userId = userStore.id;

		if (userId === undefined) {
			await userStore.initialize();
		}

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
				appLocale,
			);
		}
	}

	return {
		sets,
		setTitles,
		refreshData,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useUserSetsStore, import.meta.hot));
}
