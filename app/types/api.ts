import type { FetchOptions } from 'ofetch';

export type ApiFunction = <T = any>(endpoint: string, options?: FetchOptions) => Promise<T>;

declare module '#app' {
	interface NuxtApp {
		$madekApi: ApiFunction;
		$placeholderApi: ApiFunction;
	}
}
