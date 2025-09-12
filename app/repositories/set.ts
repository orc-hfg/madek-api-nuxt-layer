import type { ApiFunction } from '../types/api';
import type { AppLocale } from '../types/i18n-locales';

const SET_TITLE_META_KEYS: Record<AppLocale, string> = {
	de: 'madek_core:title',
	en: 'creative_work:title_en',
};

interface SetRepository {
	getTitle: (setId: string, appLocale: AppLocale) => Promise<MetaDatumString>;
	getMediaEntries: (setId: string) => Promise<CollectionMediaEntryArcs>;
	getMediaEntryImagePreviews: (mediaEntryId: string) => Promise<MediaEntryPreviews>;
	getPreviewDataStream: (previewId: string) => Promise<PreviewDataStream>;
}

function createSetRepository($madekApi: ApiFunction): SetRepository {
	return {
		async getTitle(setId: string, appLocale: AppLocale): Promise<MetaDatumString> {
			const metaKeyId = SET_TITLE_META_KEYS[appLocale];
			const response: MetaDatumString = await $madekApi(`/collection/${setId}/meta-datum/${metaKeyId}`);

			return response;
		},

		async getMediaEntries(setId: string): Promise<CollectionMediaEntryArcs> {
			return $madekApi(`/collection/${setId}/media-entry-arcs`);
		},

		async getMediaEntryImagePreviews(mediaEntryId: string): Promise<MediaEntryPreviews> {
			return $madekApi(`/media-entry/${mediaEntryId}/preview`, {
				query: {
					media_type: 'image',
				},
			});
		},

		async getPreviewDataStream(previewId: string): Promise<PreviewDataStream> {
			return $madekApi(`/previews/${previewId}/data-stream`);
		},
	};
}

export function getSetRepository(): SetRepository {
	const { $madekApi } = useNuxtApp();

	return createSetRepository($madekApi as ApiFunction);
}
