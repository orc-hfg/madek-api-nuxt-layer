import type { H3Event } from 'h3';
import type { Context, Contexts, MadekContextsResponse } from '../types/contexts';
import { createLogger } from '../../app/utils/logger';
import { defaultCache } from '../constants/cache';
import { createMadekApiClient } from '../utils/madek-api';

export async function getContexts(event: H3Event): Promise<Contexts> {
	const config = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekContextsResponse>(event);
	const logger = createLogger(event);

	logger.info('Service: getContexts', 'API baseURL:', config.public.madekApi.baseURL);

	try {
		const response = await fetchFromApi('contexts', {
			apiOptions: {
				isAuthenticationNeeded: false,
			},
			publicDataCache: defaultCache,
		});

		return response.map((item: MadekContextsResponse[number]) => {
			return {
				id: item.id,
				labels: item.labels,
			};
		});
	}
	catch (error) {
		return handleServiceError(error, logger, 'getContexts', 'Failed to fetch contexts.');
	}
}

export async function getContextById(event: H3Event, id: string): Promise<Context> {
	const config = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<Context>(event);
	const logger = createLogger(event);

	logger.info('Service: getContextById', 'API baseURL:', config.public.madekApi.baseURL);
	logger.info('Service: getContextById', 'Context ID:', id);

	try {
		const response = await fetchFromApi(`contexts/${id}`, {
			apiOptions: {
				isAuthenticationNeeded: false,
			},
			publicDataCache: defaultCache,
		});

		return {
			id: response.id,
			labels: response.labels,
		};
	}
	catch (error) {
		return handleServiceError(error, logger, 'getContextById', 'Failed to fetch context by ID.');
	}
}
