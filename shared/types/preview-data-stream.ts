import type { paths } from '../../generated/api/madek-api';

type MadekPreviewsDataStreamGet = paths['/api-v2/previews/{preview_id}/data-stream']['get'];

export type MadekPreviewsDataStreamPathParameters = MadekPreviewsDataStreamGet['parameters']['path'];

export interface PreviewDataStream extends Blob {
	readonly type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
}
