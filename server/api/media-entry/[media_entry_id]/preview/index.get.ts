import type { H3Event } from 'h3';
import { StatusCodes } from 'http-status-codes';
import { getMediaEntryPreview } from '../../../../madek-api-services/media-entry-preview';

export default defineEventHandler(async (event: H3Event) => {
	const mediaEntryId = getRouterParam(event, 'media_entry_id');
	const query = getQuery<MediaEntryPreviewQuery>(event);

	if (!isValidRouteParameter(mediaEntryId)) {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: 'Missing required URL parameters.',
		});
	}

	const pathParameters: MadekMediaEntryPreviewPathParameters = {
		media_entry_id: mediaEntryId,
	};

	return getMediaEntryPreview(
		event,
		pathParameters.media_entry_id,
		query,
	);
});
