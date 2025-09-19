import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setupAppLoggerMock } from '../../tests/mocks/logger';
import { getSetService } from './set';

describe('getSetService()', () => {
	describe('findCoverImageMediaEntryId()', () => {
		it('should return cover image when available', () => {
			const service = getSetService();
			const mediaEntries = [
				{ media_entry_id: 'entry-1', cover: false, position: 0 },
				{ media_entry_id: 'entry-2', cover: true, position: 1 },
				{ media_entry_id: 'entry-3', cover: false, position: 2 },
			];

			const result = service.findCoverImageMediaEntryId(mediaEntries);

			expect(result).toBe('entry-2');
		});

		it('should return position 0 entry when no cover image exists', () => {
			const service = getSetService();
			const mediaEntries = [
				{ media_entry_id: 'entry-1', cover: false, position: 0 },
				{ media_entry_id: 'entry-2', cover: false, position: 1 },
			];

			const result = service.findCoverImageMediaEntryId(mediaEntries);

			expect(result).toBe('entry-1');
		});

		it('should return first entry as fallback when no cover or position 0', () => {
			const service = getSetService();
			const mediaEntries = [
				{ media_entry_id: 'entry-1', cover: false, position: 5 },
				{ media_entry_id: 'entry-2', cover: false, position: 3 },
			];

			const result = service.findCoverImageMediaEntryId(mediaEntries);

			expect(result).toBe('entry-1');
		});

		it('should prioritize cover image over position 0', () => {
			const service = getSetService();
			const mediaEntries = [
				{ media_entry_id: 'entry-1', cover: false, position: 0 },
				{ media_entry_id: 'entry-2', cover: true, position: 5 },
			];

			const result = service.findCoverImageMediaEntryId(mediaEntries);

			expect(result).toBe('entry-2');
		});
	});

	describe('getPreviewIdByThumbnailType()', () => {
		let loggerErrorSpy: ReturnType<typeof vi.spyOn>;

		beforeEach(() => {
			const { loggerErrorSpy: errorSpy } = setupAppLoggerMock();
			loggerErrorSpy = errorSpy;
		});

		afterEach(() => {
			vi.restoreAllMocks();
		});

		it('should return preview id for matching thumbnail type', () => {
			const service = getSetService();
			const previews: MediaEntryPreviewThumbnails = [
				{ id: 'preview-1', thumbnail: 'small', width: 100, height: 100 },
				{ id: 'preview-2', thumbnail: 'medium', width: 200, height: 200 },
				{ id: 'preview-3', thumbnail: 'large', width: 300, height: 300 },
			];

			const result = service.getPreviewIdByThumbnailType(previews, 'medium');

			expect(result).toBe('preview-2');
		});

		it('should return undefined for non-matching thumbnail type', () => {
			const service = getSetService();
			const previews: MediaEntryPreviewThumbnails = [
				{ id: 'preview-1', thumbnail: 'small', width: 100, height: 100 },
				{ id: 'preview-2', thumbnail: 'medium', width: 200, height: 200 },
			];

			const result = service.getPreviewIdByThumbnailType(previews, 'x_large');

			expect(result).toBeUndefined();
		});

		it('should log error for non-matching thumbnail type', () => {
			const service = getSetService();
			const previews: MediaEntryPreviewThumbnails = [{ id: 'preview-1', thumbnail: 'small', width: 100, height: 100 }];

			service.getPreviewIdByThumbnailType(previews, 'large');

			expect(loggerErrorSpy).toHaveBeenCalledWith('No preview found for thumbnail type.', 'large');
		});
	});
});
