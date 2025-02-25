import type { H3Event } from "h3";
import { createError } from "h3";
import { FetchError } from "ofetch";
import type { CacheOptions, NitroFetchOptions, NitroFetchRequest } from "nitropack";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export type ApiOptions = {
	needsAuth?: boolean;
	cache?: CacheOptions;
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

	async function fetchData<T>(url: string, options: ApiOptions): Promise<T> {
		try {
			const response = await $fetch<T>(url, buildRequestConfig(options.needsAuth ?? false));

			return response as T;
		} catch (error) {
			return handleFetchError(error) as never;
		}
	}

	async function fetchFromApi<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
		const url = `${runtimeConfig.madekApi.baseUrl}${endpoint}`;

		async function fetchFunction(): Promise<T> {
			return fetchData<T>(url, options);
		}

		// Do not cache in development or if caching is not configured
		if (import.meta.dev || !options.cache) {
			return await fetchFunction();
		}

		const cacheOptions = typeof options.cache === "object" ? options.cache : {};
		return await defineCachedFunction(fetchFunction, {
			...cacheOptions,
			getKey: cacheOptions.getKey ?? (() => event.path),
		})();
	}

	return { fetchFromApi };
};
