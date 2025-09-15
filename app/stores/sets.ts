import type { AppLocale } from '../types/i18n-locales';

interface SetData {
	id: Collection['id'];
	title: MetaDatumString['string'];
	coverImageSources: ThumbnailSources;
}

export const useSetsStore = defineStore('sets', () => {
	const sets = shallowRef<Collections>([]);
	const setsData = shallowRef<SetData[]>([]);

	async function refreshData(appLocale: AppLocale): Promise<void> {
		const userStore = useUserStore();
		const setsRepository = getSetsRepository();
		const setService = getSetService();

		if (userStore.id === undefined) {
			await userStore.initialize();
		}

		if (userStore.id !== undefined) {
			const userSets = await setsRepository.getSets(
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

			sets.value = userSets;

			const [titles, coverImageSources] = await Promise.all([
				setService.getTitleBatch(
					sets.value.map(set => set.id),
					appLocale,
				),
				setService.getCoverImageThumbnailSourcesBatch(
					sets.value.map(set => set.id),
					['small', 'medium', 'large', 'x_large'],
				),
			]);

			setsData.value = sets.value.map((set, index) => {
				return {
					id: set.id,
					title: titles[index]?.string ?? '',
					coverImageSources: coverImageSources[index] ?? {},
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
