import type { AppLocale } from '../types/i18n-locales';
import { getSetRepository } from '../repositories/set';
import { getSetsRepository } from '../repositories/sets';

interface SetData {
	id: Collection['id'];
	title: MetaDatumString['string'];
	coverImageThumbnailSources: ThumbnailSources;
}

export const useSetsStore = defineStore('sets', () => {
	const sets = shallowRef<Collections>([]);
	const setsData = shallowRef<SetData[]>([]);

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

			const [titles, coverImageThumbnailSources] = await Promise.all([
				setRepository.getTitleBatch(
					sets.value.map(set => set.id),
					appLocale,
				),
				setRepository.getCoverImageThumbnailSourcesBatch(
					sets.value.map(set => set.id),
					['small', 'medium', 'large', 'x_large'],
				),
			]);

			setsData.value = sets.value.map((set, index) => {
				return {
					id: set.id,
					title: titles[index]?.string ?? '',
					coverImageThumbnailSources: coverImageThumbnailSources[index] ?? {},
				};
			});
		}
	}

	return {
		sets,
		setsData,
		refreshData,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSetsStore, import.meta.hot));
}
