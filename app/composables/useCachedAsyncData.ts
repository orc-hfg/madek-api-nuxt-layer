/*
 * See: documentation/architecture.md
 * Example implementation: example2.vue and example3.vue in Uploader app
 */

import type { AsyncDataOptions } from '#app';

export function useCachedAsyncData<TData = any>(
	key: string,
	handler: () => Promise<TData>,
	options?: AsyncDataOptions<TData>,
): ReturnType<typeof useAsyncData<TData>> {
	const asyncOptions: AsyncDataOptions<TData> = { ...options };

	// Using the same key name intentionally as it's semantically the same key
	// eslint-disable-next-line no-shadow
	asyncOptions.getCachedData = (key, nuxtApp, context): TData | undefined => {
		// See: https://github.com/nuxt/nuxt/pull/31373
		if (context.cause === 'refresh:manual') {
			return undefined;
		}

		if (key in nuxtApp.payload.data) {
			return nuxtApp.payload.data[key] as TData;
		}

		if (key in nuxtApp.static.data) {
			return nuxtApp.static.data[key] as TData;
		}

		return undefined;
	};

	return useAsyncData<TData>(
		key,
		handler,
		asyncOptions,
	) as ReturnType<typeof useAsyncData<TData>>;
}
