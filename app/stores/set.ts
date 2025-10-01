import type { MetaKeyFieldData } from '../services/set';
import type { AppLocale } from '../types/i18n-locales';

interface SetData {
	title: MetaKeyFieldData;
	subtitle: MetaKeyFieldData;
	description: MetaKeyFieldData;
}

export const useSetStore = defineStore('set', () => {
	const setData = ref<SetData | undefined>();

	async function refresh(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<void> {
		const setService = getSetService();
		const titleFieldData = await setService.getTitleFieldData(setId, appLocale);
		const subtitleFieldData = await setService.getSubtitleFieldData(setId, appLocale);
		const descriptionFieldData = await setService.getDescriptionFieldData(setId, appLocale);

		setData.value = {
			title: titleFieldData,
			subtitle: subtitleFieldData,
			description: descriptionFieldData,
		};
	}

	return {
		setData,
		refresh,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useSetStore, import.meta.hot));
}
