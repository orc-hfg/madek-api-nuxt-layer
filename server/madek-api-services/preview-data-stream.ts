import type { H3Event } from 'h3';
import { noCache } from '../constants/cache';

export async function getPreviewDataStream(event: H3Event, previewId: MadekPreviewsDataStreamPathParameters['preview_id']): Promise<PreviewDataStream> {
	const { fetchFromApiWithPathParameters } = createMadekApiClient<PreviewDataStream>(event);
	const serverLogger = createServerLogger(event, 'API Service: getPreviewDataStream');

	serverLogger.info('Preview ID:', previewId);

	try {
		const response = await fetchFromApiWithPathParameters(
			'previews/:previewId/data-stream',
			{
				previewId,
			},
			{
				apiOptions: {
					isAuthenticationNeeded: false,
				},

				// Binary Blob data cannot be cached - would be corrupted during serialization
				publicDataCache: noCache,
			},
		);

		return response;
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch preview data stream.');
	}
}
