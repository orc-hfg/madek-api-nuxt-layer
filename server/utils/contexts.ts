import type { H3Event } from 'h3';
import type { Context, Contexts, MadekContextsResponse } from '../../shared/types/api/contexts';
import { StatusCodes } from 'http-status-codes';
import { defaultCache } from '../constants/cache';
import { createDebugLogger } from './debug-logger';
import { createMadekApiClient } from './madek-api';

export async function getContexts(event: H3Event): Promise<Contexts> {
	const runtimeConfig = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<MadekContextsResponse>(event);
	const logger = createDebugLogger(event);

	logger.info('getContexts', 'API baseURL:', runtimeConfig.public.madekApi.baseURL);

	try {
		const response = await fetchFromApi('contexts', {
			apiOptions: {
				needsAuth: false,
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
		const errorMessage = 'Failed to fetch contexts.';

		logger.error('getContexts', errorMessage, error);

		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: errorMessage,
		});
	}
}

export async function getContextById(event: H3Event, id: string): Promise<Context> {
	const runtimeConfig = useRuntimeConfig(event);
	const { fetchFromApi } = createMadekApiClient<Context>(event);
	const logger = createDebugLogger(event);

	logger.info('getContextById', 'API baseURL:', runtimeConfig.public.madekApi.baseURL);
	logger.info('getContextById', 'Context ID:', id);

	try {
		const response = await fetchFromApi(`contexts/${id}`, {
			apiOptions: {
				needsAuth: false,
			},
			publicDataCache: defaultCache,
		});

		return {
			id: response.id,
			labels: response.labels,
		};
	}
	catch (error) {
		const errorMessage = 'Failed to fetch context by ID.';

		logger.error('getContextById', errorMessage, error);

		throw createError({
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			statusMessage: errorMessage,
		});
	}
}
