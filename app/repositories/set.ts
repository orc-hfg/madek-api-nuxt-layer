import type { MetaDatum } from '../../server/types/collection-meta-datum';
import type { ApiFunction } from '../types/api';
import type { AppLocale } from '../types/i18n-locales';

/*
 * Fallback rules for set title meta keys used by API routes
 * When a requested meta key returns 404, try the fallback meta key instead
 * Example: 'creative_work:title_en' (English) → 'madek_core:title' (German fallback)
 */
export const SET_TITLE_META_KEY_FALLBACKS: Record<string, string> = {
	'creative_work:title_en': 'madek_core:title',
};

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
