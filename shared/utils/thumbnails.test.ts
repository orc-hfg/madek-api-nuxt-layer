import { describe, expect, it } from 'vitest';
import { getThumbnailPixelSize } from './thumbnails';

describe('getThumbnailPixelSize()', () => {
	it('should return correct pixel size for each thumbnail type', () => {
		expect(getThumbnailPixelSize('small')).toBe(100);
		expect(getThumbnailPixelSize('small_125')).toBe(125);
		expect(getThumbnailPixelSize('medium')).toBe(300);
		expect(getThumbnailPixelSize('large')).toBe(620);
		expect(getThumbnailPixelSize('x_large')).toBe(1024);
	});

	it('should return undefined for maximum size', () => {
		expect(getThumbnailPixelSize('maximum')).toBeUndefined();
	});
});
