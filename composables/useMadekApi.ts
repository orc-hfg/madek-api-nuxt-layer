import type { H3Event } from "h3";
import type { FetchOptions } from "ofetch";
import { FetchError } from "ofetch";
import type { CacheOptions } from "nitropack";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import type { z } from "zod";
import { ZodError } from "zod";

export type ApiOptions<T> = {
	cache?: CacheOptions;
	validator?: z.ZodType<T>;
};

export const useMadekApi = (event: H3Event) => {
	const runtimeConfig = useRuntimeConfig();

	const getAuthHeader = () => {
		const token = runtimeConfig.madekApi.token;
		return token ? { Authorization: `token ${token}` } : undefined;
	};

	const fetchFromApi = async <T>(endpoint: string, options: ApiOptions<T> = {}): Promise<T> => {
		const url = `${runtimeConfig.madekApi.baseUrl}${endpoint}`;

		const result = await defineCachedFunction(
			async () => {
				try {
					return await $fetch<T>(url, {
						headers: getAuthHeader(),
					} satisfies FetchOptions);
				} catch (error) {
					if (error instanceof FetchError) {
						throw createError({
							statusCode: error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
							statusMessage:
								error.statusMessage ??
								error.statusText ??
								getReasonPhrase(error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR),
						});
					}
					throw error;
				}
			},
			{
				...options.cache,
				getKey: options.cache?.getKey ?? (() => event.path),
			}
		)();

		if (options.validator) {
			try {
				return options.validator.parse(result);
			} catch (error) {
				if (error instanceof ZodError) {
					throw createError({
						statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
						statusMessage: "Zod: Validation Error",
						data: error.errors.map((error) => ({
							path: error.path.join("."),
							message: error.message,
						})),
					});
				}
				throw error;
			}
		}

		return result as T;
	};

	return {
		fetchFromApi,
	};
};
