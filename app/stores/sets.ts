import type { MockScenario } from '../composables/useMockScenario';
import type { AppLocale } from '../types/locale';

interface SetData {
	id: Collection['id'];
	title: CollectionMetaDatum['string'];
	coverImageSources: ThumbnailSources;
}

export const useSetsStore = defineStore('sets', () => {
	const sets = shallowRef<Collections>([]);
	const setsData = shallowRef<SetData[]>([]);

	async function refresh(appLocale: AppLocale, mockScenario?: MockScenario): Promise<void> {
		const userStore = useUserStore();
		const setsRepository = getSetsRepository();
		const setsService = getSetsService();

		// Ensure user is loaded
		if (userStore.id === undefined) {
			await userStore.refresh();
		}

		// If still no user after refresh, clear data and exit
		if (userStore.id === undefined) {
			sets.value = [];
			setsData.value = [];

			return;
		}

		const baseQuery = {
			responsible_user_id: userStore.id,
			filter_by: JSON.stringify({
				meta_data: [
					{
						key: 'settings:is_node',
					},
				],
			}),
		};

		const query = mockScenario === undefined
			? baseQuery
			: {
					...baseQuery,
					mock_scenario: mockScenario,
				};

		const userSets = await setsRepository.getSets(query);

		// Use local snapshot to avoid race conditions
		const currentSets = userSets;
		const setIds = currentSets.map(set => set.id);

		const [titles, coverImageSources] = await Promise.all([
			setsService.getTitleBatch(setIds, appLocale),
			setsService.getCoverImageThumbnailSourcesBatch(
				setIds,
				['small', 'medium', 'large', 'x_large'],
			),
		]);

		// Only update reactive state after all data is fetched and mapped
		const mappedData = currentSets.map((set, index) => {
			return {
				id: set.id,
				title: titles[index]?.string ?? '',
				coverImageSources: coverImageSources[index] ?? {},
			};
		});

		// Atomic update: both refs updated together with consistent data
		sets.value = currentSets;
		setsData.value = mappedData;
	}

	return {
		sets,
		setsData,
		refresh,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSetsStore, import.meta.hot));
}
