import type { H3Event } from 'h3';
import { fiveMinutesCache } from '../constants/cache';

type Collection = MadekCollectionMetaDatumPathParameters['collection_id'];

type MetaKeyId = MadekCollectionMetaDatumPathParameters['meta_key_id'];

export async function getCollectionMetaDatum(event: H3Event, collectionId: Collection, metaKeyId: MetaKeyId): Promise<MetaDatumString> {
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekCollectionMetaDatumResponse>(event);
	const serverLogger = createServerLogger(event, 'Service: getCollectionMetaDatum');

	serverLogger.info('Collection ID:', collectionId);
	serverLogger.info('Meta Key ID:', metaKeyId);

	try {
		const response = await fetchFromApiWithPathParameters(
			'collection/:collectionId/meta-datum/:metaKeyId',
			{
				collectionId,
				metaKeyId,
			},
			{
				apiOptions: {
					isAuthenticationNeeded: false,
				},
				publicDataCache: fiveMinutesCache,
			},
		);

		return {
			string: response['meta-data'].string,
		};
	}
	catch (error) {
		// Allow 404 not found errors to propagate up to the API endpoint level for potential fallback handling
		if (isH3NotFoundError(error)) {
			throw error;
		}

		return handleServiceError(serverLogger, error, 'Failed to fetch collection meta datum.');
	}
}
