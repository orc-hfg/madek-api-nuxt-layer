import type { AsyncDataOptions } from '#app';

/*
 * Issues with reactive keys: https://github.com/nuxt/nuxt/issues/21532
 * This PR should solve this and other issues: https://github.com/nuxt/nuxt/pull/31373
 */
export function useCachedAsyncData<T = any>(
	key: string,
	handler: () => Promise<T>,
	options?: AsyncDataOptions<T>,
): ReturnType<typeof useAsyncData<T>> {
	const asyncOptions: AsyncDataOptions<T> = { ...options };

	asyncOptions.getCachedData = (key, nuxtApp): T | undefined => {
		if (key in nuxtApp.payload.data) {
			return nuxtApp.payload.data[key] as T;
		}

		if (key in nuxtApp.static.data) {
			return nuxtApp.static.data[key] as T;
		}

		return undefined;
	};

	return useAsyncData<T>(
		key,
		handler,
		asyncOptions,
	) as ReturnType<typeof useAsyncData<T>>;
}
