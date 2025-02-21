import type { H3Event } from "h3";
import { createError } from "h3";
import { FetchError } from "ofetch";
import type { CacheOptions, NitroFetchOptions, NitroFetchRequest } from "nitropack";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import type { z } from "zod";

export type ApiOptions<T> = {
	cache?: CacheOptions;
	validator?: z.ZodType<T>;
};

export const useMadekApi = (event: H3Event) => {
	const runtimeConfig = useRuntimeConfig();

	function getAuthHeader(): Record<string, string> | undefined {
		const token = runtimeConfig.madekApi.token;
		return token ? { Authorization: `token ${token}` } : undefined;
	}

	function buildRequestConfig(needsAuth: boolean): NitroFetchOptions<NitroFetchRequest> {
		return {
			headers: needsAuth ? getAuthHeader() : undefined,
		};
	}

	function handleFetchError(error: unknown) {
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

	function validateData<T>(data: unknown, validator?: z.ZodType<T>): T {
		if (!validator) {
			return data as T;
		}

		const validation = validator.safeParse(data);
		if (!validation.success) {
			console.error("🔥 Zod: Invalid API Response Format:", validation.error.errors);

			throw createError({
				statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
				statusMessage: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
				message: "🔥 Zod: Invalid API Response Format",
				data: validation.error.errors.map((err) => ({
					path: err.path.join("."),
					message: err.message,
				})),
			});
		}
		return validation.data;
	}

	async function fetchData<T>(url: string, needsAuth: boolean): Promise<T> {
		try {
			const response = await $fetch<T>(url, buildRequestConfig(needsAuth));

			return response as T;
		} catch (error) {
			return handleFetchError(error) as never;
		}
	}

	async function fetchFromApi<T>(endpoint: string, options: ApiOptions<T> = {}, needsAuth: boolean): Promise<T> {
		const url = `${runtimeConfig.madekApi.baseUrl}${endpoint}`;

		const result = await defineCachedFunction(
			async () => {
				return await fetchData<T>(url, needsAuth);
			},
			{
				...options.cache,
				getKey: options.cache?.getKey ?? (() => event.path),
			}
		)();

		return validateData<T>(result, options.validator);
	}

	return { fetchFromApi };
};
