import type { paths } from '../../generated/api/madek-api';
import type { PreviewId } from './branded';

type MadekMediaEntryPreviewGet = paths['/api-v2/media-entry/{media_entry_id}/preview']['get'];

export type MadekMediaEntryPreviewPathParameters = MadekMediaEntryPreviewGet['parameters']['path'];

type MadekMediaEntryPreviewQuery = NonNullable<MadekMediaEntryPreviewGet['parameters']['query']>;
export type MediaEntryPreviewQuery = Pick<MadekMediaEntryPreviewQuery, 'media_type'>;

export type ThumbnailTypes = 'maximum' | 'x_large' | 'large' | 'medium' | 'small_125' | 'small';

export interface MadekMediaEntryPreview {
	readonly media_type: string;
	readonly width: number | null;
	readonly content_type: string;
	readonly updated_at: string;
	readonly filename: string;
	readonly conversion_profile: string | null;
	readonly media_file_id: string;
	readonly thumbnail: ThumbnailTypes;
	readonly id: string;
	readonly created_at: string;
	readonly height: number | null;
}

export interface ThumbnailSource {
	readonly url: string;
	readonly width: number | undefined;
}

export type ThumbnailSources = Partial<Record<ThumbnailTypes, ThumbnailSource>>;

export interface MediaEntryPreview {
	readonly id: PreviewId;
	readonly width: number | null;
	readonly height: number | null;
	readonly thumbnail: ThumbnailTypes;
}

export type MediaEntryPreviewThumbnails = MediaEntryPreview[];
