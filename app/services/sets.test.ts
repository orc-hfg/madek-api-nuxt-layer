import { describe, expect, it } from 'vitest';
import { findCoverImageMediaEntryId, getPreviewIdByThumbnailType, mapSetsToDisplayData } from './sets';

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

	describe('mapSetsToDisplayData()', () => {
		it('should map sets with titles and cover images to display data', () => {
			const sets: Collections = [
				{ id: 'set-1' },
				{ id: 'set-2' },
			];

			const titles: CollectionMetaData = [
				{ string: 'Project A' },
				{ string: 'Project B' },
			];

			const coverImageSources: ThumbnailSources[] = [
				{ small: { url: 'https://example.com/img1.jpg', width: 100 } },
				{ medium: { url: 'https://example.com/img2.jpg', width: 200 } },
			];

			const result = mapSetsToDisplayData(sets, titles, coverImageSources);

			expect(result).toStrictEqual([
				{
					id: 'set-1',
					title: 'Project A',
					coverImageSources: { small: { url: 'https://example.com/img1.jpg', width: 100 } },
				},
				{
					id: 'set-2',
					title: 'Project B',
					coverImageSources: { medium: { url: 'https://example.com/img2.jpg', width: 200 } },
				},
			]);
		});

		it('should handle missing title with empty string fallback', () => {
			const sets: Collections = [{ id: 'set-1' }];
			const titles: CollectionMetaData = [null as unknown as CollectionMetaDatum];
			const coverImageSources: ThumbnailSources[] = [{}];

			const result = mapSetsToDisplayData(sets, titles, coverImageSources);

			expect(result).toStrictEqual([
				{
					id: 'set-1',
					title: '',
					coverImageSources: {},
				},
			]);
		});

		it('should handle empty title string', () => {
			const sets: Collections = [{ id: 'set-1' }];
			const titles: CollectionMetaData = [{ string: '' }];
			const coverImageSources: ThumbnailSources[] = [{}];

			const result = mapSetsToDisplayData(sets, titles, coverImageSources);

			expect(result).toStrictEqual([
				{
					id: 'set-1',
					title: '',
					coverImageSources: {},
				},
			]);
		});

		it('should handle missing cover images with empty object fallback', () => {
			const sets: Collections = [{ id: 'set-1' }];
			const titles: CollectionMetaData = [{ string: 'Project A' }];
			const coverImageSources: ThumbnailSources[] = [null as unknown as ThumbnailSources];

			const result = mapSetsToDisplayData(sets, titles, coverImageSources);

			expect(result).toStrictEqual([
				{
					id: 'set-1',
					title: 'Project A',
					coverImageSources: {},
				},
			]);
		});

		it('should handle multiple sets with mixed data availability', () => {
			const sets: Collections = [
				{ id: 'set-1' },
				{ id: 'set-2' },
				{ id: 'set-3' },
			];

			const titles: CollectionMetaData = [
				{ string: 'Project A' },
				null as unknown as CollectionMetaDatum,
				{ string: 'Project C' },
			];

			const coverImageSources: ThumbnailSources[] = [
				{ small: { url: 'https://example.com/img1.jpg', width: 100 } },
				{},
				null as unknown as ThumbnailSources,
			];

			const result = mapSetsToDisplayData(sets, titles, coverImageSources);

			expect(result).toStrictEqual([
				{
					id: 'set-1',
					title: 'Project A',
					coverImageSources: { small: { url: 'https://example.com/img1.jpg', width: 100 } },
				},
				{
					id: 'set-2',
					title: '',
					coverImageSources: {},
				},
				{
					id: 'set-3',
					title: 'Project C',
					coverImageSources: {},
				},
			]);
		});
	});
});
