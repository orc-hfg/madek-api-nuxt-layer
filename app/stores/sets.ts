import type { MockScenario } from '../composables/useMockScenario';
import type { SetListDisplayData } from '../services/sets';
import type { AppLocale } from '../types/locale';

export const useSetsStore = defineStore('sets', () => {
	const sets = shallowRef<Collections>([]);
	const setsDisplayData = shallowRef<SetListDisplayData[]>([]);

	async function refresh(appLocale: AppLocale, mockScenario?: MockScenario): Promise<void> {
		const userStore = useUserStore();
		const setsRepository = getSetsRepository();
		const setsService = getSetsService();

		// Ensure user is loaded
		if (userStore.userDisplayData?.id === undefined) {
			await userStore.refresh();
		}

		// If still no user after refresh, clear data and exit
		if (userStore.userDisplayData?.id === undefined) {
			sets.value = [];
			setsDisplayData.value = [];

			return;
		}

		const baseQuery = {
			responsible_user_id: userStore.userDisplayData.id,
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

		sets.value = userSets;
		setsDisplayData.value = await setsService.getSetsDisplayData(userSets, appLocale, ['small', 'medium', 'large', 'x_large']);
	}

	return {
		sets,
		setsDisplayData,
		refresh,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSetsStore, import.meta.hot));
}
