import type { ApiFunction } from '../types/api';
import type { AppLocale } from '../types/i18n-locales';

const SET_TITLE_META_KEYS: Record<AppLocale, string> = {
	de: 'madek_core:title',
	en: 'creative_work:title_en',
};

interface SetRepository {
	getTitle: (setId: string, appLocale: AppLocale) => Promise<CollectionMetaDatum>;
	getMediaEntries: (setId: string) => Promise<CollectionMediaEntryArcs>;
	getMediaEntryImagePreviews: (mediaEntryId: string) => Promise<MediaEntryPreviewThumbnails>;
	getPreviewDataStream: (previewId: string) => Promise<PreviewDataStream>;
}

function createSetRepository($madekApi: ApiFunction): SetRepository {
	const appLogger = createAppLogger('Repository: set');

	return {
		async getTitle(setId: string, appLocale: AppLocale): Promise<CollectionMetaDatum> {
			const metaKeyId = SET_TITLE_META_KEYS[appLocale];
			const response: CollectionMetaDatum = await $madekApi(`/collection/${setId}/meta-datum/${metaKeyId}`);

			appLogger.debug('getTitle: Title fetched successfully', { response });

			return response;
		},

		async getMediaEntries(setId: string): Promise<CollectionMediaEntryArcs> {
			appLogger.debug('getMediaEntries: Media entries fetched successfully', { setId });

			return $madekApi(`/collection/${setId}/media-entry-arcs`);
		},

		async getMediaEntryImagePreviews(mediaEntryId: string): Promise<MediaEntryPreviewThumbnails> {
			appLogger.debug('getMediaEntryImagePreviews: Media entry image previews fetched successfully', { mediaEntryId });

			return $madekApi(`/media-entry/${mediaEntryId}/preview`, {
				query: {
					media_type: 'image',
				},
			});
		},

		async getPreviewDataStream(previewId: string): Promise<PreviewDataStream> {
			appLogger.debug('getPreviewDataStream: Preview data stream fetched successfully', { previewId });

			return $madekApi(`/previews/${previewId}/data-stream`);
		},
	};
}

export function getSetRepository(): SetRepository {
	const { $madekApi } = useNuxtApp();

	return createSetRepository($madekApi as ApiFunction);
}
