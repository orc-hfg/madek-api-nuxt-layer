import type { H3Event } from 'h3';
import { noCache } from '../constants/cache';

/*
 * Note: Function is named 'getMediaEntryPreviewThumbnails' instead of 'getMediaEntryPreview'
 * (matching the API endpoint) to clarify that the endpoint returns an array of different
 * thumbnail sizes, not a single preview object. The Madek API endpoint naming is inconsistent here:
 * - Endpoint: /media-entry/:id/preview (singular)
 * - Returns: Array of thumbnail objects (plural)
 */
export async function getMediaEntryPreviewThumbnails(event: H3Event, mediaEntryId: MadekMediaEntryPreviewPathParameters['media_entry_id'], query: MediaEntryPreviewQuery): Promise<MediaEntryPreviewThumbnails> {
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekMediaEntryPreview[]>(event);
	const serverLogger = createServerLogger(event, 'API Service: getMediaEntryPreviewThumbnails');

	serverLogger.info('Media Entry ID:', mediaEntryId);
	serverLogger.info('Query params:', { media_type: query.media_type });

	try {
		const response = await fetchFromApiWithPathParameters(
			'media-entry/:mediaEntryId/preview',
			{
				mediaEntryId,
			},
			{
				apiOptions: {
					isAuthenticationNeeded: false,
					query,
				},

				// Binary Blob data cannot be cached - would be corrupted during serialization
				publicDataCache: noCache,
			},
		);

		return response.map((item) => {
			return {
				id: toPreviewId(item.id),
				width: item.width,
				height: item.height,
				thumbnail: item.thumbnail,
			};
		});
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch media entry preview.');
	}
}
