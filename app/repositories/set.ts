import type { ApiFunction } from '../types/api';
import type { AppLocale } from '../types/i18n-locales';
import { apiBaseName } from '../plugins/madek-api';

const SET_TITLE_META_KEYS: Record<AppLocale, string> = {
	de: 'madek_core:title',
	en: 'creative_work:title_en',
};

function getPreviewDataStreamUrl(previewId: string, addInternalApiPath: boolean): string {
	const path = `/previews/${previewId}/data-stream`;

	return addInternalApiPath ? `/${apiBaseName}${path}` : path;
}

interface SetRepository {
	getTitle: (setId: string, appLocale: AppLocale) => Promise<MetaDatumString>;
	getTitleBatch: (setIds: string[], appLocale: AppLocale) => Promise<MetaDatumStrings>;
	getMediaEntries: (setId: string) => Promise<CollectionMediaEntryArcs>;
	getMediaEntryImagePreviews: (mediaEntryId: string) => Promise<MediaEntryPreviews>;
	getCoverImagePreviews: (setId: string) => Promise<MediaEntryPreviews | undefined>;
	getCoverImageThumbnailSources: (setId: string, thumbnailTypes: ThumbnailTypes[]) => Promise<ThumbnailSources>;
	getCoverImageThumbnailSourcesBatch: (setIds: string[], thumbnailTypes: ThumbnailTypes[]) => Promise<ThumbnailSources[]>;
	getPreviewDataStream: (previewId: string) => Promise<PreviewDataStream>;
}

function createSetRepository($madekApi: ApiFunction): SetRepository {
	const appLogger = createAppLogger('Repository: set');

	return {
		async getTitle(setId: string, appLocale: AppLocale): Promise<MetaDatumString> {
			const metaKeyId = SET_TITLE_META_KEYS[appLocale];
			const response: MetaDatumString = await $madekApi(`/collection/${setId}/meta-datum/${metaKeyId}`);

			return response;
		},

		async getTitleBatch(setIds: string[], appLocale: AppLocale): Promise<MetaDatumStrings> {
			const titlePromises = setIds.map(async setId => this.getTitle(setId, appLocale));

			return Promise.all(titlePromises);
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

		async getCoverImagePreviews(setId: string): Promise<MediaEntryPreviews | undefined> {
			const mediaEntries = await this.getMediaEntries(setId);

			if (mediaEntries.length === 0) {
				return undefined;
			}

			const coverImageMediaEntryId = findCoverImageMediaEntryId(mediaEntries);

			const coverImagePreviews = await this.getMediaEntryImagePreviews(coverImageMediaEntryId);

			if (coverImagePreviews.length === 0) {
				return undefined;
			}

			return coverImagePreviews;
		},

		async getCoverImageThumbnailSources(setId: string, thumbnailTypes: ThumbnailTypes[]): Promise<ThumbnailSources> {
			const coverImagePreviews = await this.getCoverImagePreviews(setId);

			if (!coverImagePreviews) {
				appLogger.error('getCoverImageThumbnailSources: No cover image previews found.', setId);

				return {};
			}

			const thumbnailSources: ThumbnailSources = {};
			for (const thumbnailType of thumbnailTypes) {
				const previewId = getPreviewIdByThumbnailType(coverImagePreviews, thumbnailType, appLogger);

				if (previewId !== undefined) {
					(thumbnailSources as Record<ThumbnailTypes, ThumbnailSource>)[thumbnailType] = {
						url: getPreviewDataStreamUrl(previewId, true),
						width: getThumbnailPixelSize(thumbnailType),
					};
				}
			}

			return thumbnailSources;
		},

		async getCoverImageThumbnailSourcesBatch(setIds: string[], thumbnailTypes: ThumbnailTypes[]): Promise<ThumbnailSources[]> {
			const thumbnailSourcesPromises = setIds.map(async setId => this.getCoverImageThumbnailSources(setId, thumbnailTypes));
			const thumbnailSources = await Promise.all(thumbnailSourcesPromises);

			return thumbnailSources;
		},

		async getPreviewDataStream(previewId: string): Promise<PreviewDataStream> {
			/*
			 * Use relative path without /api prefix since $madekApi automatically adds it
			 * Calls the server endpoint defined by /server/api/previews/[preview_id]/data-stream/
			 */
			return $madekApi(getPreviewDataStreamUrl(previewId, false));
		},
	};
}

export function getSetRepository(): SetRepository {
	const { $madekApi } = useNuxtApp();

	return createSetRepository($madekApi as ApiFunction);
}
