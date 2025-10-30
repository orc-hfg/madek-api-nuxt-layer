import type { MockScenario } from '../composables/useMockScenario';
import type { SetListItemData } from '../services/sets';
import type { AppLocale } from '../types/locale';

export const useSetsStore = defineStore('sets', () => {
	const sets = shallowRef<Collections>([]);
	const setsData = shallowRef<SetListItemData[]>([]);

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

		const setsDisplayData = await setsService.getSetsDisplayData(userSets, appLocale, ['small', 'medium', 'large', 'x_large']);

		sets.value = userSets;
		setsData.value = setsDisplayData;
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
