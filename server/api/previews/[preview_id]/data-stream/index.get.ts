import type { H3Event } from 'h3';
import { StatusCodes } from 'http-status-codes';
import { getPreviewDataStream } from '../../../../madek-api-services/preview-data-stream';

export default defineEventHandler(async (event: H3Event) => {
	const previewId = getRouterParam(event, 'preview_id');

	if (!isValidRouteParameter(previewId)) {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: 'Missing required URL parameters.',
		});
	}

	const pathParameters: MadekPreviewsDataStreamPathParameters = {
		preview_id: previewId,
	};

	return getPreviewDataStream(
		event,
		pathParameters.preview_id,
	);
});
