import type { H3Event } from 'h3';
import { mockData } from '../../../../../madek-api-mock/data';
import { getMediaEntryMetaDatum } from '../../../../../madek-api-services/media-entry-meta-datum/service';
import { routeParameterSchemas } from '../../../../../schemas/madek-api-route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.mediaEntryMetaDatum);

	const pathParameters: MadekMediaEntryMetaDatumPathParameters = {
		media_entry_id: parameters.media_entry_id,
		meta_key_id: parameters.meta_key_id,
	};

	return getApiMockOrExecute(
		event,
		'API: media-entry meta-datum',
		'Returning mock: media-entry meta-datum',
		{ mediaEntryId: pathParameters.media_entry_id, metaKeyId: pathParameters.meta_key_id },
		() => mockData.getMediaEntryMetaDatum(pathParameters.media_entry_id, pathParameters.meta_key_id),
		async () => getMediaEntryMetaDatum(event, pathParameters.media_entry_id, pathParameters.meta_key_id),
	);
});
