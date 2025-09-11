import type { H3Event } from 'h3';
import { fiveMinutesCache } from '../constants/cache';

type Collection = MadekCollectionMediaEntryArcsPathParameters['collection_id'];

export async function getCollectionMediaEntryArcs(event: H3Event, collectionId: Collection): Promise<CollectionMediaEntryArcs> {
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekCollectionMediaEntryArcsResponse>(event);
	const serverLogger = createServerLogger(event, 'Service: getCollectionMediaEntryArcs');

	serverLogger.info('Collection ID:', collectionId);

	try {
		const response = await fetchFromApiWithPathParameters(
			'collection/:collectionId/media-entry-arcs',
			{
				collectionId,
			},
			{
				apiOptions: {
					isAuthenticationNeeded: false,
				},
				publicDataCache: fiveMinutesCache,
			},
		);

		return response['collection-media-entry-arcs'].map((item) => {
			return {
				media_entry_id: item.media_entry_id,
				cover: item.cover,
				position: item.position,
			};
		});
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch collection media entry arcs.');
	}
}
