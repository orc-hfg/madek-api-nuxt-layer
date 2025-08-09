import type { H3Event } from 'h3';
import type { MadekCollectionMetaDatumResponse, MetaDatum } from '../types/collection-meta-datum';
import { fiveMinutesCache } from '../constants/cache';

export async function getCollectionMetaDatum(event: H3Event, collectionId: string, metaKeyId: string): Promise<MetaDatum> {
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
			id: response['meta-data'].id,
			string: response['meta-data'].string,
		};
	}
	catch (error) {
		return handleServiceError(serverLogger, error, 'Failed to fetch collection meta datum.');
	}
}
