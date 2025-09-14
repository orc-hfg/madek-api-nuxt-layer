import type { H3Event } from 'h3';
import { getCollectionMediaEntryArcs } from '../../../../madek-api-services/collection-media-entry-arcs';
import { routeParameterSchemas } from '../../../../schemas/route';

export default defineEventHandler(async (event: H3Event) => {
	const parameters = await validateRouteParameters(event, routeParameterSchemas.collectionId);

	const pathParameters: MadekCollectionMediaEntryArcsPathParameters = {
		collection_id: parameters.collection_id,
	};

	return getCollectionMediaEntryArcs(
		event,
		pathParameters.collection_id,
	);
});
