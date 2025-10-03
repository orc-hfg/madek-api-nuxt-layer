import type { PeopleMetaKeyFieldData, StringMetaKeyFieldData } from '../services/set';
import type { AppLocale } from '../types/i18n-locales';

interface SetData {
	authors: PeopleMetaKeyFieldData;
	title: StringMetaKeyFieldData;
	subtitle: StringMetaKeyFieldData;
	description: StringMetaKeyFieldData;
	titleAlternativeLocale: StringMetaKeyFieldData;
	subtitleAlternativeLocale: StringMetaKeyFieldData;
	descriptionAlternativeLocale: StringMetaKeyFieldData;
	portrayedObjectDate: StringMetaKeyFieldData;
	dimension: StringMetaKeyFieldData;
	duration: StringMetaKeyFieldData;
	format: StringMetaKeyFieldData;
}

export const useSetStore = defineStore('set', () => {
	const setData = ref<SetData | undefined>();

	async function refresh(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<void> {
		const setService = getSetService();
		const alternativeLocale: AppLocale = appLocale === 'de' ? 'en' : 'de';

		const authorsFieldData = await setService.getAuthorsFieldData(setId, appLocale);

		const titleFieldData = await setService.getTitleFieldData(setId, appLocale);
		const subtitleFieldData = await setService.getSubtitleFieldData(setId, appLocale);
		const descriptionFieldData = await setService.getDescriptionFieldData(setId, appLocale);

		const titleAlternativeLocaleFieldData = await setService.getTitleFieldData(setId, alternativeLocale);
		const subtitleAlternativeLocaleFieldData = await setService.getSubtitleFieldData(setId, alternativeLocale);
		const descriptionAlternativeLocaleFieldData = await setService.getDescriptionFieldData(setId, alternativeLocale);

		const portrayedObjectDateFieldData = await setService.getPortrayedObjectDateFieldData(setId, appLocale);
		const dimensionFieldData = await setService.getDimensionFieldData(setId, appLocale);
		const durationFieldData = await setService.getDurationFieldData(setId, appLocale);
		const formatFieldData = await setService.getFormatFieldData(setId, appLocale);

		setData.value = {
			authors: authorsFieldData,
			title: titleFieldData,
			subtitle: subtitleFieldData,
			description: descriptionFieldData,
			titleAlternativeLocale: titleAlternativeLocaleFieldData,
			subtitleAlternativeLocale: subtitleAlternativeLocaleFieldData,
			descriptionAlternativeLocale: descriptionAlternativeLocaleFieldData,
			portrayedObjectDate: portrayedObjectDateFieldData,
			dimension: dimensionFieldData,
			duration: durationFieldData,
			format: formatFieldData,
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
