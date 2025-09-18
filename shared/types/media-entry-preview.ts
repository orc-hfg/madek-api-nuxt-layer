import type { paths } from '../../generated/api/madek-api';

type MadekMediaEntryPreviewGet = paths['/api-v2/media-entry/{media_entry_id}/preview']['get'];

export type MadekMediaEntryPreviewPathParameters = MadekMediaEntryPreviewGet['parameters']['path'];
export type MediaEntryId = MadekMediaEntryPreviewPathParameters['media_entry_id'];

type MadekMediaEntryPreviewQuery = NonNullable<MadekMediaEntryPreviewGet['parameters']['query']>;
export type MediaEntryPreviewQuery = Pick<MadekMediaEntryPreviewQuery, 'media_type'>;

export type ThumbnailTypes = 'maximum' | 'x_large' | 'large' | 'medium' | 'small_125' | 'small';

interface MadekMediaEntryPreview {
	media_type: string;
	width: number | null;
	content_type: string;
	updated_at: string;
	filename: string;
	conversion_profile: string | null;
	media_file_id: string;
	thumbnail: ThumbnailTypes;
	id: string;
	created_at: string;
	height: number | null;
}

export interface ThumbnailSource {
	url: string;
	width: number | undefined;
}

export type ThumbnailSources = Partial<Record<ThumbnailTypes, ThumbnailSource>>;

export type MediaEntryPreviewId = MadekMediaEntryPreview['id'];
export type MediaEntryPreview = Pick<MadekMediaEntryPreview, 'id' | 'width' | 'height' | 'thumbnail'>;
export type MediaEntryPreviewThumbnails = MediaEntryPreview[];
