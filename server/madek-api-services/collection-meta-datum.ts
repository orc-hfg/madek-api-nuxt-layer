import type { H3Event } from 'h3';
import type { MadekCollectionMetaDatumResponse, MetaDatumString } from '../types/collection-meta-datum';
import { noCache } from '../constants/cache';
import { createServerLogger } from '../utils/server-logger';

export async function getCollectionMetaDatum(event: H3Event, collectionId: string, metaKeyId: string): Promise<MetaDatumString> {
	const config = useRuntimeConfig(event);
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekCollectionMetaDatumResponse>(event);
	const serverLogger = createServerLogger(event);

	serverLogger.info('Service: getCollectionMetaDatum', 'API baseURL:', config.public.madekApi.baseURL);
	serverLogger.info('Service: getCollectionMetaDatum', 'Collection ID:', collectionId);
	serverLogger.info('Service: getCollectionMetaDatum', 'Meta Key ID:', metaKeyId);

	try {
		const response = await fetchFromApiWithPathParameters(
			'collection/:collectionId/meta-datum/:metaKeyId',
			{
				collectionId,
				metaKeyId,
			},
			{
				apiOptions: {
					isAuthenticationNeeded: true,
				},
				publicDataCache: noCache,
			},
		);

		return {
			string: response['meta-data'].string,
		};
	}
	catch (error) {
		return handleServiceError(error, 'getCollectionMetaDatum', serverLogger, 'Failed to fetch collection meta datum.');
	}
}
