import type { H3Event } from "h3";
import { getAuthHeader } from "../server/utils/auth-service";
import type { FetchOptions } from "ofetch";
import type { CacheOptions } from "nitropack";

export type ApiOptions = {
	cache?: CacheOptions;
};

export const useMadekApi = (event: H3Event) => {
	const config = useRuntimeConfig();
	const defaultHeaders = getAuthHeader();

	const fetchFromApi = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
		const url = `${config.madekApi.baseUrl}${endpoint}`;

		const result = await defineCachedFunction(
			async () => {
				return $fetch<T>(url, {
					headers: defaultHeaders,
				} satisfies FetchOptions);
			},
			{
				...options.cache,
				getKey: options.cache?.getKey ?? (() => event.path),
			}
		)();

		return result as T;
	};

	return {
		fetchFromApi,
	};
};
