import type { H3Event } from 'h3';
import { mockData } from '../../../../madek-api-mock/data';
import { getApiMockOrExecute } from '../../../../madek-api-mock/handler';
import { getMediaEntryPreviewThumbnails } from '../../../../madek-api-services/media-entry-preview-thumbnails';
import { routeParameterSchemas, routeQuerySchemas } from '../../../../schemas/madek-api-route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.mediaEntryId);
	const query = await validateQueryParameters(event, routeQuerySchemas.mediaEntryPreview);

	const pathParameters: MadekMediaEntryPreviewPathParameters = {
		media_entry_id: parameters.media_entry_id,
	};

	return getApiMockOrExecute(
		event,
		'API: media-entry preview',
		'Returning mock: media-entry preview',
		{ media_entry_id: pathParameters.media_entry_id, media_type: query.media_type },
		() => mockData.getMediaEntryPreviewThumbnails(pathParameters.media_entry_id, query),
		async () => getMediaEntryPreviewThumbnails(event, pathParameters.media_entry_id, query),
	);
});
