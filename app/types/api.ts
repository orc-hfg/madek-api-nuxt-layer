import type { FetchOptions } from 'ofetch';

export type ApiFunction = <T = any>(
	endpoint: string,
	options?: FetchOptions
) => Promise<T>;
