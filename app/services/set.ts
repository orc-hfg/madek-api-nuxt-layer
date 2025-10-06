import type { CollectionKeywordInfo, CollectionPersonInfo } from '../../shared/types/collection-meta-datum';
import type { AppLocale } from '../types/i18n-locales';

const SET_META_KEYS = {
	authors: {
		de: 'madek_core:authors',
		en: 'madek_core:authors',
	},
	title: {
		de: 'madek_core:title',
		en: 'creative_work:title_en',
	},
	subtitle: {
		de: 'madek_core:subtitle',
		en: 'creative_work:subtitle_en',
	},
	description: {
		de: 'madek_core:description',
		en: 'creative_work:description_en',
	},
	portrayedObjectDate: {
		de: 'madek_core:portrayed_object_date',
		en: 'madek_core:portrayed_object_date',
	},
	keywords: {
		de: 'madek_core:keywords',
		en: 'madek_core:keywords',
	},
	semester: {
		de: 'institution:semester',
		en: 'institution:semester',
	},
	programOfStudy: {
		de: 'institution:program_of_study',
		en: 'institution:program_of_study',
	},
	material: {
		de: 'creative_work:material',
		en: 'creative_work:material',
	},
	dimension: {
		de: 'creative_work:dimension',
		en: 'creative_work:dimension',
	},
	duration: {
		de: 'creative_work:duration',
		en: 'creative_work:duration',
	},
	format: {
		de: 'creative_work:format',
		en: 'creative_work:format',
	},
} as const satisfies Record<string, Record<AppLocale, MadekCollectionMetaDatumPathParameters['meta_key_id']>>;

type SetMetaKeyField = keyof typeof SET_META_KEYS;

export interface StringMetaKeyFieldData {
	readonly label: string;
	readonly value: string;
}

export interface PeopleMetaKeyFieldData {
	readonly label: string;
	readonly value: CollectionPersonInfo[];
}

export interface KeywordsMetaKeyFieldData {
	readonly label: string;
	readonly value: CollectionKeywordInfo[];
}

interface SetService {
	getAuthorsFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<PeopleMetaKeyFieldData>;
	getTitle: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<CollectionMetaDatum>;
	getTitleFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getSubtitleFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getDescriptionFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getPortrayedObjectDateFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getKeywordsFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<KeywordsMetaKeyFieldData>;
	getSemesterFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<KeywordsMetaKeyFieldData>;
	getProgramOfStudyFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<KeywordsMetaKeyFieldData>;
	getMaterialFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<KeywordsMetaKeyFieldData>;
	getDimensionFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getDurationFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getFormatFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
}

function createSetService(): SetService {
	const setRepository = getSetRepository();

	async function getMetaKeyLabel(metaKeyId: MadekMetaKeysGetPathParameters['id'], appLocale: AppLocale): Promise<MetaKeyLabels['labels'][AppLocale]> {
		const metaKeyLabels = await setRepository.getMetaKeyLabels(metaKeyId);

		return metaKeyLabels.labels[appLocale];
	};

	async function getMetaDatumValue(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<CollectionMetaDatum> {
		const metaKeyId = SET_META_KEYS[field][appLocale];
		const response: CollectionMetaDatum = await setRepository.getCollectionMetaDatum(setId, metaKeyId);

		return response;
	};

	async function getMetaDatumFieldData(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
		const metaKeyId = SET_META_KEYS[field][appLocale];

		const [metaKeyLabel, metaKeyValue] = await Promise.all([
			getMetaKeyLabel(metaKeyId, appLocale),
			getMetaDatumValue(field, setId, appLocale),
		]);

		return {
			label: metaKeyLabel,
			value: metaKeyValue.string,
		};
	};

	async function getPeopleBasedFieldData(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<PeopleMetaKeyFieldData> {
		const metaKeyId = SET_META_KEYS[field][appLocale];

		const [metaKeyLabel, metaKeyValue] = await Promise.all([
			getMetaKeyLabel(metaKeyId, appLocale),
			getMetaDatumValue(field, setId, appLocale),
		]);

		return {
			label: metaKeyLabel,
			value: metaKeyValue.people ?? [],
		};
	}

	async function getKeywordsBasedFieldData(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
		const metaKeyId = SET_META_KEYS[field][appLocale];

		const [metaKeyLabel, metaKeyValue] = await Promise.all([
			getMetaKeyLabel(metaKeyId, appLocale),
			getMetaDatumValue(field, setId, appLocale),
		]);

		return {
			label: metaKeyLabel,
			value: metaKeyValue.keywords ?? [],
		};
	}

	return {
		async getAuthorsFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<PeopleMetaKeyFieldData> {
			return getPeopleBasedFieldData('authors', setId, appLocale);
		},

		async getTitle(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<CollectionMetaDatum> {
			return getMetaDatumValue('title', setId, appLocale);
		},

		async getTitleFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('title', setId, appLocale);
		},

		async getSubtitleFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('subtitle', setId, appLocale);
		},

		async getDescriptionFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('description', setId, appLocale);
		},

		async getPortrayedObjectDateFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('portrayedObjectDate', setId, appLocale);
		},

		async getKeywordsFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
			return getKeywordsBasedFieldData('keywords', setId, appLocale);
		},

		async getSemesterFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
			return getKeywordsBasedFieldData('semester', setId, appLocale);
		},

		async getProgramOfStudyFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
			return getKeywordsBasedFieldData('programOfStudy', setId, appLocale);
		},

		async getMaterialFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<KeywordsMetaKeyFieldData> {
			return getKeywordsBasedFieldData('material', setId, appLocale);
		},

		async getDimensionFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('dimension', setId, appLocale);
		},

		async getDurationFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('duration', setId, appLocale);
		},

		async getFormatFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return getMetaDatumFieldData('format', setId, appLocale);
		},
	};
}

export function getSetService(): SetService {
	return createSetService();
}
