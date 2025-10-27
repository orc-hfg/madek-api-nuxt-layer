import type { H3Event } from 'h3';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export async function validateRouteParameters<TSchema extends z.ZodType>(
	event: H3Event,
	schema: TSchema,
): Promise<z.infer<TSchema>> {
	const parameters = await getValidatedRouterParams(event, data => schema.safeParse(data));
	if (!parameters.success) {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: `Parameter validation failed: ${z.prettifyError(parameters.error)}`,
		});
	}

	return parameters.data;
}

export async function validateQueryParameters<TSchema extends z.ZodType>(
	event: H3Event,
	schema: TSchema,
): Promise<z.infer<TSchema>> {
	const query = await getValidatedQuery(event, data => schema.safeParse(data));
	if (!query.success) {
		throw createError({
			statusCode: StatusCodes.BAD_REQUEST,
			statusMessage: `Query validation failed: ${z.prettifyError(query.error)}`,
		});
	}

	return query.data;
}
