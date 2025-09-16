/*
 * See: documentation/architecture.md
 * Example implementation: example2.vue and example3.vue in Uploader app
 */

import type { AsyncDataOptions } from '#app';

export function useCachedAsyncData<T = any>(
	key: string,
	handler: () => Promise<T>,
	options?: AsyncDataOptions<T>,
): ReturnType<typeof useAsyncData<T>> {
	const asyncOptions: AsyncDataOptions<T> = { ...options };

	// Using the same key name intentionally as it's semantically the same key
	// eslint-disable-next-line no-shadow
	asyncOptions.getCachedData = (key, nuxtApp, context): T | undefined => {
		// See: https://github.com/nuxt/nuxt/pull/31373
		if (context.cause === 'refresh:manual') {
			return undefined;
		}

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
