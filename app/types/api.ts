import type { FetchOptions } from 'ofetch';

export type ApiFunction = <TResponse = unknown>(endpoint: string, options?: FetchOptions) => Promise<TResponse>;
