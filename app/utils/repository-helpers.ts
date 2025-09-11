function findPreviewByThumbnailType(previews: MediaEntryPreviews, thumbnailType: ThumbnailTypes): MediaEntryPreview | undefined {
	return previews.find(preview => preview.thumbnail === thumbnailType);
}

export function getPreviewIdByThumbnailType(previews: MediaEntryPreviews, thumbnailType: ThumbnailTypes, appLogger: Logger): MediaEntryPreviewId | undefined {
	const preview = findPreviewByThumbnailType(previews, thumbnailType);

	if (!preview) {
		appLogger.error('No preview found for thumbnail type.', thumbnailType);

		return undefined;
	}

	return preview.id;
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
