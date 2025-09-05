import type { H3Event } from 'h3';
import type { MadekCollectionMediaEntryArcsPathParameters } from '../../../../../shared/types/collection-media-entry-arcs';
import { StatusCodes } from 'http-status-codes';
import { getCollectionMediaEntryArcs } from '../../../../madek-api-services/collection-media-entry-arcs';

export default defineEventHandler(async (event: H3Event) => {
	const collectionId = getRouterParam(event, 'collection_id');

	if (!isValidRouteParameter(collectionId)) {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: 'Missing required URL parameters.',
		});
	}

	const pathParameters: MadekCollectionMediaEntryArcsPathParameters = {
		collection_id: collectionId,
	};

	return getCollectionMediaEntryArcs(
		event,
		pathParameters.collection_id,
	);
});
