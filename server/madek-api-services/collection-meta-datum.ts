import type { H3Event } from 'h3';
import type { MadekCollectionMetaDatumResponse, MetaDatumString } from '../types/collection-meta-datum';
import { StatusCodes } from 'http-status-codes';
import { noCache } from '../constants/cache';
import { createLogger } from '../utils/logger';
import { createMadekApiClient } from '../utils/madek-api';

export async function getCollectionMetaDatum(event: H3Event, collectionId: string, metaKeyId: string): Promise<MetaDatumString> {
	const runtimeConfig = useRuntimeConfig(event);
	const { fetchFromApiWithPathParameters } = createMadekApiClient<MadekCollectionMetaDatumResponse>(event);
	const logger = createLogger(event);

	logger.info('getCollectionMetaDatum', 'API baseURL:', runtimeConfig.public.madekApi.baseURL);
	logger.info('getCollectionMetaDatum', 'Collection ID:', collectionId);
	logger.info('getCollectionMetaDatum', 'Meta Key ID:', metaKeyId);

	try {
		const response = await fetchFromApiWithPathParameters(
			'collection/:collectionId/meta-datum/:metaKeyId',
			{
				collectionId,
				metaKeyId,
			},
			{
				apiOptions: {
					needsAuth: true,
				},
				publicDataCache: noCache,
			},
		);

		return {
			string: response['meta-data'].string,
		};
	}
	catch (error) {
		const errorMessage = 'Failed to fetch collection meta datum.';

		logger.error('getCollectionMetaDatum', errorMessage, error);

		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: errorMessage,
		});
	}
}
