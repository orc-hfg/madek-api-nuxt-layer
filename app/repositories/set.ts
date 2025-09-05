import type { MetaDatum } from '../../shared/types/collection-meta-datum';
import type { ApiFunction } from '../types/api';
import type { AppLocale } from '../types/i18n-locales';

const SET_TITLE_META_KEYS: Record<AppLocale, string> = {
	de: 'madek_core:title',
	en: 'creative_work:title_en',
};

interface SetRepository {
	getSetTitle: (setId: string, appLocale: AppLocale) => Promise<MetaDatum>;
	getSetTitles: (setIds: string[], appLocale: AppLocale) => Promise<MetaDatum[]>;
}

function createSetRepository($madekApi: ApiFunction): SetRepository {
	return {
		async getSetTitle(setId: string, appLocale: AppLocale): Promise<MetaDatum> {
			const metaKeyId = SET_TITLE_META_KEYS[appLocale];

			return $madekApi(`/collection/${setId}/meta-datum/${metaKeyId}`);
		},

		async getSetTitles(setIds: string[], appLocale: AppLocale): Promise<MetaDatum[]> {
			const titlePromises = setIds.map(async setId => this.getSetTitle(setId, appLocale));

			return Promise.all(titlePromises);
		},
	};
}

export function getSetRepository(): SetRepository {
	const { $madekApi } = useNuxtApp();

	return createSetRepository($madekApi as ApiFunction);
}
