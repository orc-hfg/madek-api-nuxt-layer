import { describe, expect, it } from 'vitest';
import { filterMediaEntriesWithAccess } from './set';

describe('getSetService()', () => {
	describe('filterMediaEntriesWithAccess()', () => {
		it('filters out media entries with undefined title', () => {
			const mediaEntries = [
				{ mediaEntryId: 'entry-1', title: 'Project A', thumbnailSources: {} },
				{ mediaEntryId: 'entry-2', title: undefined, thumbnailSources: {} },
				{ mediaEntryId: 'entry-3', title: 'Project C', thumbnailSources: {} },
			];

			const result = filterMediaEntriesWithAccess(mediaEntries);

			expect(result).toHaveLength(2);
			expect(result[0]).toStrictEqual({
				mediaEntryId: 'entry-1',
				title: 'Project A',
				thumbnailSources: {},
			});
			expect(result[1]).toStrictEqual({
				mediaEntryId: 'entry-3',
				title: 'Project C',
				thumbnailSources: {},
			});
		});

		it('returns empty array when all entries have undefined title', () => {
			const mediaEntries = [
				{ mediaEntryId: 'entry-1', title: undefined, thumbnailSources: {} },
				{ mediaEntryId: 'entry-2', title: undefined, thumbnailSources: {} },
			];

			const result = filterMediaEntriesWithAccess(mediaEntries);

			expect(result).toStrictEqual([]);
		});

		it('returns all entries when none have undefined title', () => {
			const mediaEntries = [
				{ mediaEntryId: 'entry-1', title: 'Project A', thumbnailSources: {} },
				{ mediaEntryId: 'entry-2', title: 'Project B', thumbnailSources: {} },
			];

			const result = filterMediaEntriesWithAccess(mediaEntries);

			expect(result).toHaveLength(2);
			expect(result).toStrictEqual(mediaEntries);
		});

		it('handles empty array input', () => {
			const mediaEntries: { mediaEntryId: string; title: string | undefined; thumbnailSources: ThumbnailSources }[] = [];

			const result = filterMediaEntriesWithAccess(mediaEntries);

			expect(result).toStrictEqual([]);
		});

		it('preserves thumbnail sources when filtering', () => {
			const mediaEntries = [
				{
					mediaEntryId: 'entry-1',
					title: 'Project A',
					thumbnailSources: {
						small: { url: 'https://example.com/img1.jpg', width: 100 },
					},
				},
				{
					mediaEntryId: 'entry-2',
					title: undefined,
					thumbnailSources: {
						medium: { url: 'https://example.com/img2.jpg', width: 200 },
					},
				},
			];

			const result = filterMediaEntriesWithAccess(mediaEntries);

			expect(result).toHaveLength(1);
			expect(result[0]?.thumbnailSources).toStrictEqual({
				small: { url: 'https://example.com/img1.jpg', width: 100 },
			});
		});
	});
});
