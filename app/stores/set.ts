import type { KeywordsMetaKeyFieldData, MediaEntryWithTitleAndThumbnails, PeopleMetaKeyFieldData, RolesMetaKeyFieldData, StringMetaKeyFieldData } from '../services/set';
import type { AppLocale } from '../types/locale';

interface SetData {
	authors: PeopleMetaKeyFieldData;
	title: StringMetaKeyFieldData;
	subtitle: StringMetaKeyFieldData;
	description: StringMetaKeyFieldData;
	titleAlternativeLocale: StringMetaKeyFieldData;
	subtitleAlternativeLocale: StringMetaKeyFieldData;
	descriptionAlternativeLocale: StringMetaKeyFieldData;
	portrayedObjectDate: StringMetaKeyFieldData;
	projectCategory: KeywordsMetaKeyFieldData;
	keywords: KeywordsMetaKeyFieldData;
	semester: KeywordsMetaKeyFieldData;
	programOfStudy: KeywordsMetaKeyFieldData;
	otherCreativeParticipants: RolesMetaKeyFieldData;
	material: KeywordsMetaKeyFieldData;
	dimension: StringMetaKeyFieldData;
	duration: StringMetaKeyFieldData;
	format: StringMetaKeyFieldData;
	mediaEntries: MediaEntryWithTitleAndThumbnails[];
}

export const useSetStore = defineStore('set', () => {
	const setData = ref<SetData | undefined>();

	async function refresh(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<void> {
		const setService = getSetService();
		const alternativeLocale = getAlternativeLocale(appLocale);

		/*
		 * Execute all service calls in parallel to minimize latency
		 * Each service call internally fetches label + value in parallel (2 HTTP requests)
		 */
		const [
			authorsFieldData,
			titleFieldData,
			subtitleFieldData,
			descriptionFieldData,
			titleAlternativeLocaleFieldData,
			subtitleAlternativeLocaleFieldData,
			descriptionAlternativeLocaleFieldData,
			portrayedObjectDateFieldData,
			projectCategoryFieldData,
			keywordsFieldData,
			semesterFieldData,
			programOfStudyFieldData,
			otherCreativeParticipantsFieldData,
			materialFieldData,
			dimensionFieldData,
			durationFieldData,
			formatFieldData,
			mediaEntriesData,
		] = await Promise.all([
			setService.getAuthorsFieldData(setId, appLocale),
			setService.getTitleFieldData(setId, appLocale),
			setService.getSubtitleFieldData(setId, appLocale),
			setService.getDescriptionFieldData(setId, appLocale),
			setService.getTitleFieldData(setId, appLocale, alternativeLocale),
			setService.getSubtitleFieldData(setId, appLocale, alternativeLocale),
			setService.getDescriptionFieldData(setId, appLocale, alternativeLocale),
			setService.getPortrayedObjectDateFieldData(setId, appLocale),
			setService.getProjectCategoryFieldData(setId, appLocale),
			setService.getKeywordsFieldData(setId, appLocale),
			setService.getSemesterFieldData(setId, appLocale),
			setService.getProgramOfStudyFieldData(setId, appLocale),
			setService.getOtherCreativeParticipantsFieldData(setId, appLocale),
			setService.getMaterialFieldData(setId, appLocale),
			setService.getDimensionFieldData(setId, appLocale),
			setService.getDurationFieldData(setId, appLocale),
			setService.getFormatFieldData(setId, appLocale),
			setService.getMediaEntriesWithTitlesAndThumbnails(setId, appLocale, ['small_125', 'medium']),
		]);

		setData.value = {
			authors: authorsFieldData,
			title: titleFieldData,
			subtitle: subtitleFieldData,
			description: descriptionFieldData,
			titleAlternativeLocale: titleAlternativeLocaleFieldData,
			subtitleAlternativeLocale: subtitleAlternativeLocaleFieldData,
			descriptionAlternativeLocale: descriptionAlternativeLocaleFieldData,
			portrayedObjectDate: portrayedObjectDateFieldData,
			projectCategory: projectCategoryFieldData,
			keywords: keywordsFieldData,
			semester: semesterFieldData,
			programOfStudy: programOfStudyFieldData,
			otherCreativeParticipants: otherCreativeParticipantsFieldData,
			material: materialFieldData,
			dimension: dimensionFieldData,
			duration: durationFieldData,
			format: formatFieldData,
			mediaEntries: mediaEntriesData,
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
