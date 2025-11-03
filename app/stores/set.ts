import type { SetDetailDisplayData } from '../services/set';
import type { AppLocale } from '../types/locale';

export const useSetStore = defineStore('set', () => {
	const setDisplayData = shallowRef<SetDetailDisplayData | undefined>();

	async function refresh(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<void> {
		const setService = getSetService();

		setDisplayData.value = await setService.getSetDisplayData(setId, appLocale, ['small_125', 'medium']);
	}

	return {
		setDisplayData,
		refresh,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSetStore, import.meta.hot));
}
