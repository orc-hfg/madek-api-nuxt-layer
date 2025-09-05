import type { MetaDatum } from '../../shared/types/collection-meta-datum';
import type { Collection } from '../../shared/types/collections';
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

		if (userStore.id === undefined) {
			await userStore.initialize();
		}

		if (userStore.id !== undefined) {
			const data = await setsRepository.getSets(
				{
					responsible_user_id: userStore.id,
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
