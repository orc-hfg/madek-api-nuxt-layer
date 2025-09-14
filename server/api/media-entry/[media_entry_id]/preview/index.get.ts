import type { H3Event } from 'h3';
import { getMediaEntryPreview } from '../../../../madek-api-services/media-entry-preview';
import { routeParameterSchemas, routeQuerySchemas } from '../../../../schemas/route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.mediaEntryId);
	const query = await validateQueryParameters(event, routeQuerySchemas.mediaEntryPreview);

	const pathParameters: MadekMediaEntryPreviewPathParameters = {
		media_entry_id: parameters.media_entry_id,
	};

	return getMediaEntryPreview(
		event,
		pathParameters.media_entry_id,
		query,
	);
});
