import type { H3Event } from 'h3';
import type { MadekCollectionMetaDatumResponse, MetaDatumString } from '../types/collection-meta-datum';
import { createLogger } from '../../app/utils/logger';
import { noCache } from '../constants/cache';
import { createMadekApiClient } from '../utils/madek-api';

export async function getCollectionMetaDatum(event: H3Event, collectionId: string, metaKeyId: string): Promise<MetaDatumString> {
	const config = useRuntimeConfig(event);
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekCollectionMetaDatumResponse>(event);
	const logger = createLogger(event);

	logger.info('Service: getCollectionMetaDatum', 'API baseURL:', config.public.madekApi.baseURL);
	logger.info('Service: getCollectionMetaDatum', 'Collection ID:', collectionId);
	logger.info('Service: getCollectionMetaDatum', 'Meta Key ID:', metaKeyId);

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
		return handleServiceError(error, logger, 'getCollectionMetaDatum', 'Failed to fetch collection meta datum.');
	}
}
