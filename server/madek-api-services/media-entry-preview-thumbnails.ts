import type { H3Event } from 'h3';
import { fiveMinutesCache } from '../constants/cache';

export async function getMediaEntryPreviewThumbnails(event: H3Event, mediaEntryId: MediaEntryId, query: MediaEntryPreviewQuery): Promise<MediaEntryPreviewThumbnails> {
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MediaEntryPreviewThumbnails>(event);
	const serverLogger = createServerLogger(event, 'Service: getMediaEntryPreviewThumbnails');

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
				publicDataCache: fiveMinutesCache,
			},
		);

		return response.map((item) => {
			return {
				id: item.id,
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
