import type { AppLocale } from '../types/locale';
import { buildApiUrl } from '../utils/api-url';
import { getSetService } from './set';

interface SetsService {
	getTitleBatch: (setIds: MadekCollectionMetaDatumPathParameters['collection_id'][], appLocale: AppLocale) => Promise<CollectionMetaData>;
	getCoverImageThumbnailSources: (setId: MadekCollectionMediaEntryArcsPathParameters['collection_id'], thumbnailTypes: ThumbnailTypes[]) => Promise<ThumbnailSources>;
	getCoverImageThumbnailSourcesBatch: (setIds: MadekCollectionMediaEntryArcsPathParameters['collection_id'][], thumbnailTypes: ThumbnailTypes[]) => Promise<ThumbnailSources[]>;
}

export function findCoverImageMediaEntryId(mediaEntries: CollectionMediaEntryArcs): CollectionMediaEntryArc['media_entry_id'] {
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
}

export function getPreviewIdByThumbnailType(previews: MediaEntryPreviewThumbnails, thumbnailType: ThumbnailTypes): MadekMediaEntryPreview['id'] | undefined {
	const matchingPreview = previews.find(preview => preview.thumbnail === thumbnailType);

	if (!matchingPreview) {
		return undefined;
	}

	return matchingPreview.id;
}

function createSetsService(): SetsService {
	const appLogger = createAppLogger('Service: sets');
	const setRepository = getSetRepository();
	const setService = getSetService();

	async function getCoverImagePreviews(setId: MadekMediaEntryPreviewPathParameters['media_entry_id']): Promise<MediaEntryPreviewThumbnails | undefined> {
		const mediaEntries = await setRepository.getMediaEntries(setId);

		if (mediaEntries.length === 0) {
			return undefined;
		}

		const coverImageMediaEntryId = findCoverImageMediaEntryId(mediaEntries);

		const coverImagePreviews = await setRepository.getMediaEntryImagePreviews(coverImageMediaEntryId);

		if (coverImagePreviews.length === 0) {
			return undefined;
		}

		return coverImagePreviews;
	}

	return {
		async getTitleBatch(setIds: MadekCollectionMetaDatumPathParameters['collection_id'][], appLocale: AppLocale): Promise<CollectionMetaData> {
			const titlePromises = setIds.map(async setId => setService.getTitle(setId, appLocale));

			return Promise.all(titlePromises);
		},

		async getCoverImageThumbnailSources(setId: MadekCollectionMediaEntryArcsPathParameters['collection_id'], thumbnailTypes: ThumbnailTypes[]): Promise<ThumbnailSources> {
			const coverImagePreviews = await getCoverImagePreviews(setId);

			if (!coverImagePreviews) {
				appLogger.warn('getCoverImageThumbnailSources: No cover image previews found.', setId);

				return {};
			}

			const thumbnailSources: ThumbnailSources = {};
			for (const thumbnailType of thumbnailTypes) {
				const previewId = getPreviewIdByThumbnailType(coverImagePreviews, thumbnailType);

				if (previewId === undefined) {
					appLogger.warn('getCoverImageThumbnailSources: No preview found for thumbnail type.', thumbnailType);
				}

				if (previewId !== undefined) {
					(thumbnailSources as Record<ThumbnailTypes, ThumbnailSource>)[thumbnailType] = {
						url: buildApiUrl(`/previews/${previewId}/data-stream`),
						width: getThumbnailPixelSize(thumbnailType),
					};
				}
			}

			return thumbnailSources;
		},

		async getCoverImageThumbnailSourcesBatch(setIds: MadekCollectionMediaEntryArcsPathParameters['collection_id'][], thumbnailTypes: ThumbnailTypes[]): Promise<ThumbnailSources[]> {
			const thumbnailSourcesPromises = setIds.map(async setId => this.getCoverImageThumbnailSources(setId, thumbnailTypes));
			const thumbnailSources = await Promise.all(thumbnailSourcesPromises);

			return thumbnailSources;
		},
	};
}

export function getSetsService(): SetsService {
	return createSetsService();
}
