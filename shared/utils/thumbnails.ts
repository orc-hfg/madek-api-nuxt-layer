import type { ThumbnailTypes } from '../types/media-entry-preview';

export const THUMBNAIL_SIZE_MAP = {
	maximum: undefined,
	x_large: 1024,
	large: 620,
	medium: 300,
	small_125: 125,
	small: 100,
} as const satisfies Record<ThumbnailTypes, number | undefined>;

export function getThumbnailPixelSize(size: ThumbnailTypes): number | undefined {
	return THUMBNAIL_SIZE_MAP[size];
}
