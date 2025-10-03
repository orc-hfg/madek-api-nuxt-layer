import type { CollectionPersonInfo } from '../../shared/types/collection-meta-datum';
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

interface SetService {
	getMetaKeyLabel: (metaKeyId: MadekMetaKeysGetPathParameters['id'], appLocale: AppLocale) => Promise<MetaKeyLabels['labels'][AppLocale]>;
	getMetaDatumValue: (field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<CollectionMetaDatum>;
	getMetaDatumFieldData: (field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getAuthorsFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<PeopleMetaKeyFieldData>;
	getTitle: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<CollectionMetaDatum>;
	getTitleFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getSubtitleFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getDescriptionFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getPortrayedObjectDateFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getDimensionFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getDurationFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
	getFormatFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<StringMetaKeyFieldData>;
}

function createSetService(): SetService {
	const setRepository = getSetRepository();

	return {
		async getMetaKeyLabel(metaKeyId: MadekMetaKeysGetPathParameters['id'], appLocale: AppLocale): Promise<MetaKeyLabels['labels'][AppLocale]> {
			const metaKeyLabels = await setRepository.getMetaKeyLabels(metaKeyId);

			return metaKeyLabels.labels[appLocale];
		},

		async getMetaDatumValue(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<CollectionMetaDatum> {
			const metaKeyId = SET_META_KEYS[field][appLocale];
			const response: CollectionMetaDatum = await setRepository.getCollectionMetaDatum(setId, metaKeyId);

			return response;
		},

		async getMetaDatumFieldData(field: SetMetaKeyField, setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			const metaKeyId = SET_META_KEYS[field][appLocale];

			const [metaKeyLabel, metaKeyValue] = await Promise.all([
				this.getMetaKeyLabel(metaKeyId, appLocale),
				this.getMetaDatumValue(field, setId, appLocale),
			]);

			return {
				label: metaKeyLabel,
				value: metaKeyValue.string,
			};
		},

		async getAuthorsFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<PeopleMetaKeyFieldData> {
			const metaKeyId = SET_META_KEYS.authors[appLocale];

			const [metaKeyLabel, metaKeyValue] = await Promise.all([
				this.getMetaKeyLabel(metaKeyId, appLocale),
				this.getMetaDatumValue('authors', setId, appLocale),
			]);

			return {
				label: metaKeyLabel,
				value: metaKeyValue.people ?? [],
			};
		},
		async getTitle(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<CollectionMetaDatum> {
			return this.getMetaDatumValue('title', setId, appLocale);
		},

		async getTitleFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return this.getMetaDatumFieldData('title', setId, appLocale);
		},

		async getSubtitleFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return this.getMetaDatumFieldData('subtitle', setId, appLocale);
		},

		async getDescriptionFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return this.getMetaDatumFieldData('description', setId, appLocale);
		},

		async getPortrayedObjectDateFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return this.getMetaDatumFieldData('portrayedObjectDate', setId, appLocale);
		},

		async getDimensionFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return this.getMetaDatumFieldData('dimension', setId, appLocale);
		},

		async getDurationFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return this.getMetaDatumFieldData('duration', setId, appLocale);
		},

		async getFormatFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<StringMetaKeyFieldData> {
			return this.getMetaDatumFieldData('format', setId, appLocale);
		},
	};
}

export function getSetService(): SetService {
	return createSetService();
}
