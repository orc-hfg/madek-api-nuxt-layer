import type { AppLocale } from '../types/i18n-locales';

const SET_META_KEYS = {
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
} as const satisfies Record<string, Record<AppLocale, MadekCollectionMetaDatumPathParameters['meta_key_id']>>;

export interface MetaKeyFieldData {
	readonly label: string;
	readonly value: string;
}

interface SetService {
	getMetaKeyLabel: (metaKeyId: MadekMetaKeysGetPathParameters['id'], appLocale: AppLocale) => Promise<MetaKeyLabels['labels'][AppLocale]>;
	getTitle: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<CollectionMetaDatum>;
	getTitleFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<MetaKeyFieldData>;
	getSubtitle: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<CollectionMetaDatum>;
	getSubtitleFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<MetaKeyFieldData>;
	getDescription: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<CollectionMetaDatum>;
	getDescriptionFieldData: (setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale) => Promise<MetaKeyFieldData>;
}

function createSetService(): SetService {
	const setRepository = getSetRepository();

	return {
		async getMetaKeyLabel(metaKeyId: MadekMetaKeysGetPathParameters['id'], appLocale: AppLocale): Promise<MetaKeyLabels['labels'][AppLocale]> {
			const metaKeyLabels = await setRepository.getMetaKeyLabels(metaKeyId);

			return metaKeyLabels.labels[appLocale];
		},

		async getTitle(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<CollectionMetaDatum> {
			const metaKeyId = SET_META_KEYS.title[appLocale];
			const response: CollectionMetaDatum = await setRepository.getCollectionMetaDatum(setId, metaKeyId);

			return response;
		},

		async getTitleFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<MetaKeyFieldData> {
			const metaKeyId = SET_META_KEYS.title[appLocale];

			const [metaKeyLabel, metaKeyValue] = await Promise.all([
				this.getMetaKeyLabel(metaKeyId, appLocale),
				this.getTitle(setId, appLocale),
			]);

			return {
				label: metaKeyLabel,
				value: metaKeyValue.string,
			};
		},

		async getSubtitle(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<CollectionMetaDatum> {
			const metaKeyId = SET_META_KEYS.subtitle[appLocale];
			const response: CollectionMetaDatum = await setRepository.getCollectionMetaDatum(setId, metaKeyId);

			return response;
		},

		async getSubtitleFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<MetaKeyFieldData> {
			const metaKeyId = SET_META_KEYS.subtitle[appLocale];

			const [metaKeyLabel, metaKeyValue] = await Promise.all([
				this.getMetaKeyLabel(metaKeyId, appLocale),
				this.getSubtitle(setId, appLocale),
			]);

			return {
				label: metaKeyLabel,
				value: metaKeyValue.string,
			};
		},

		async getDescription(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<CollectionMetaDatum> {
			const metaKeyId = SET_META_KEYS.description[appLocale];
			const response: CollectionMetaDatum = await setRepository.getCollectionMetaDatum(setId, metaKeyId);

			return response;
		},

		async getDescriptionFieldData(setId: MadekCollectionMetaDatumPathParameters['collection_id'], appLocale: AppLocale): Promise<MetaKeyFieldData> {
			const metaKeyId = SET_META_KEYS.description[appLocale];

			const [metaKeyLabel, metaKeyValue] = await Promise.all([
				this.getMetaKeyLabel(metaKeyId, appLocale),
				this.getDescription(setId, appLocale),
			]);

			return {
				label: metaKeyLabel,
				value: metaKeyValue.string,
			};
		},
	};
}

export function getSetService(): SetService {
	return createSetService();
}
