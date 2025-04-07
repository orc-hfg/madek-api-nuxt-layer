import type { H3Event } from 'h3';
import { StatusCodes } from 'http-status-codes';
import { getContextById } from '../../utils/contexts';

export default defineEventHandler(async (event: H3Event) => {
	const contextId = getRouterParam(event, 'id');

	if (contextId === undefined || contextId === '') {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: 'Context ID is required.',
		});
	}

	const context = await getContextById(event, contextId);
	return context;
});
