import type { FetchOptions } from 'ofetch';

type ApiFunction = <T = any>(endpoint: string, options?: FetchOptions) => Promise<T>;

declare module '#app' {
	interface NuxtApp {
		$api: ApiFunction;
	}
}
