import type { H3Event } from 'h3';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export async function validateRouteParameters<T extends z.ZodType>(
	event: H3Event,
	schema: T,
): Promise<z.infer<T>> {
	const parameters = await getValidatedRouterParams(event, data => schema.safeParse(data));
	if (!parameters.success) {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: `Parameter validation failed: ${z.prettifyError(parameters.error)}`,
		});
	}

	return parameters.data;
}

export async function validateQueryParameters<T extends z.ZodType>(
	event: H3Event,
	schema: T,
): Promise<z.infer<T>> {
	const query = await getValidatedQuery(event, data => schema.safeParse(data));
	if (!query.success) {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: `Query validation failed: ${z.prettifyError(query.error)}`,
		});
	}

	return query.data;
}
