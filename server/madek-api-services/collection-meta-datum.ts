import type { H3Event } from 'h3';
import type { MadekCollectionMetaDatumResponse, MetaDatumString } from '../types/collection-meta-datum';
import { noCache } from '../constants/cache';
import { createServerLogger } from '../utils/server-logger';

export async function getCollectionMetaDatum(event: H3Event, collectionId: string, metaKeyId: string): Promise<MetaDatumString> {
	const config = useRuntimeConfig(event);
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekCollectionMetaDatumResponse>(event);
	const serverLogger = createServerLogger(event);

	const LOGGER_SOURCE = 'Service: getCollectionMetaDatum';

	serverLogger.info(LOGGER_SOURCE, 'API baseURL:', config.public.madekApi.baseURL);
	serverLogger.info(LOGGER_SOURCE, 'Collection ID:', collectionId);
	serverLogger.info(LOGGER_SOURCE, 'Meta Key ID:', metaKeyId);

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
