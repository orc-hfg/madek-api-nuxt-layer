import type { FetchOptions } from 'ofetch';

export type ApiFunction = <TResponse = any>(
	endpoint: string,
	options?: FetchOptions,
) => Promise<TResponse>;
