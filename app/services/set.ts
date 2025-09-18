import type { AppLocale } from '../types/i18n-locales';

interface SetService {
	getTitleBatch: (setIds: string[], appLocale: AppLocale) => Promise<CollectionMetaData>;
	getCoverImagePreviews: (setId: string) => Promise<MediaEntryPreviewThumbnails | undefined>;
	getCoverImageThumbnailSources: (setId: string, thumbnailTypes: ThumbnailTypes[]) => Promise<ThumbnailSources>;
	getCoverImageThumbnailSourcesBatch: (setIds: string[], thumbnailTypes: ThumbnailTypes[]) => Promise<ThumbnailSources[]>;
	getPreviewIdByThumbnailType: (previews: MediaEntryPreviewThumbnails, thumbnailType: ThumbnailTypes) => MediaEntryPreviewId | undefined;
	findCoverImageMediaEntryId: (mediaEntries: CollectionMediaEntryArcs) => CollectionMediaEntryArc['media_entry_id'];
}

function createSetService(): SetService {
	const config = useRuntimeConfig();
	const { apiBaseName } = config.public;

	const appLogger = createAppLogger('Service: set');
	const setRepository = getSetRepository();

	return {
		async getTitleBatch(setIds: string[], appLocale: AppLocale): Promise<CollectionMetaData> {
			const titlePromises = setIds.map(async setId => setRepository.getTitle(setId, appLocale));

			return Promise.all(titlePromises);
		},

		async getCoverImagePreviews(setId: string): Promise<MediaEntryPreviewThumbnails | undefined> {
			const mediaEntries = await setRepository.getMediaEntries(setId);

			if (mediaEntries.length === 0) {
				return undefined;
			}

			const coverImageMediaEntryId = this.findCoverImageMediaEntryId(mediaEntries);

			const coverImagePreviews = await setRepository.getMediaEntryImagePreviews(coverImageMediaEntryId);

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
				const previewId = this.getPreviewIdByThumbnailType(coverImagePreviews, thumbnailType);

				if (previewId !== undefined) {
					(thumbnailSources as Record<ThumbnailTypes, ThumbnailSource>)[thumbnailType] = {
						url: `/${apiBaseName}/previews/${previewId}/data-stream`,
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

		getPreviewIdByThumbnailType(previews: MediaEntryPreviewThumbnails, thumbnailType: ThumbnailTypes): MediaEntryPreviewId | undefined {
			const matchingPreview = previews.find(preview => preview.thumbnail === thumbnailType);

			if (!matchingPreview) {
				appLogger.error('No preview found for thumbnail type.', thumbnailType);

				return undefined;
			}

			return matchingPreview.id;
		},

		findCoverImageMediaEntryId(mediaEntries: CollectionMediaEntryArcs): CollectionMediaEntryArc['media_entry_id'] {
			// Priority 1: Cover image
			const coverImage = mediaEntries.find((entry: CollectionMediaEntryArc) => entry.cover === true);
			if (coverImage) {
				return coverImage.media_entry_id;
			}

			// Priority 2: Position 0
			const positionZeroImage = mediaEntries.find((entry: CollectionMediaEntryArc) => entry.position === 0);
			if (positionZeroImage) {
				return positionZeroImage.media_entry_id;
			}

			// Priority 3: First entry as fallback
			return mediaEntries[0]!.media_entry_id;
		},
	};
}

export function getSetService(): SetService {
	return createSetService();
}
