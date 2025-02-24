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

		return await defineCachedFunction(async () => fetchData<T>(url, options), {
			...options.cache,
			getKey: options.cache?.getKey ?? (() => event.path),
		})();
	}

	return { fetchFromApi };
};
