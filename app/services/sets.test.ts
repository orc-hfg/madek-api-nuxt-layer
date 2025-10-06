import { describe, expect, it } from 'vitest';
import { findCoverImageMediaEntryId, getPreviewIdByThumbnailType } from './sets';

describe('getSetsService()', () => {
	describe('findCoverImageMediaEntryId()', () => {
		it('should return cover image when available', () => {
			const mediaEntries = [
				{ media_entry_id: 'entry-1', cover: false, position: 0 },
				{ media_entry_id: 'entry-2', cover: true, position: 1 },
				{ media_entry_id: 'entry-3', cover: false, position: 2 },
			];

			const result = findCoverImageMediaEntryId(mediaEntries);

			expect(result).toBe('entry-2');
		});

		it('should return position 0 entry when no cover image exists', () => {
			const mediaEntries = [
				{ media_entry_id: 'entry-1', cover: false, position: 0 },
				{ media_entry_id: 'entry-2', cover: false, position: 1 },
			];

			const result = findCoverImageMediaEntryId(mediaEntries);

			expect(result).toBe('entry-1');
		});

		it('should return first entry as fallback when no cover or position 0', () => {
			const mediaEntries = [
				{ media_entry_id: 'entry-1', cover: false, position: 5 },
				{ media_entry_id: 'entry-2', cover: false, position: 3 },
			];

			const result = findCoverImageMediaEntryId(mediaEntries);

			expect(result).toBe('entry-1');
		});

		it('should prioritize cover image over position 0', () => {
			const mediaEntries = [
				{ media_entry_id: 'entry-1', cover: false, position: 0 },
				{ media_entry_id: 'entry-2', cover: true, position: 5 },
			];

			const result = findCoverImageMediaEntryId(mediaEntries);

			expect(result).toBe('entry-2');
		});
	});

	describe('getPreviewIdByThumbnailType()', () => {
		it('should return preview id for matching thumbnail type', () => {
			const previews: MediaEntryPreviewThumbnails = [
				{ id: 'preview-1', thumbnail: 'small', width: 100, height: 100 },
				{ id: 'preview-2', thumbnail: 'medium', width: 200, height: 200 },
				{ id: 'preview-3', thumbnail: 'large', width: 300, height: 300 },
			];

			const result = getPreviewIdByThumbnailType(previews, 'medium');

			expect(result).toBe('preview-2');
		});

		it('should return undefined for non-matching thumbnail type', () => {
			const previews: MediaEntryPreviewThumbnails = [
				{ id: 'preview-1', thumbnail: 'small', width: 100, height: 100 },
				{ id: 'preview-2', thumbnail: 'medium', width: 200, height: 200 },
			];

			const result = getPreviewIdByThumbnailType(previews, 'x_large');

			expect(result).toBeUndefined();
		});
	});
});
