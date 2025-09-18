import type { paths } from '../../generated/api/madek-api';

type MadekContextsGet = paths['/api-v2/contexts']['get'];

// This is a manual type definition because the OpenAPI schema only provides a generic 'unknown' type for this endpoint's response.
export interface MadekContextsGetPathParameters {
	id: string;
}

export type MadekContextsResponse = MadekContextsGet['responses']['200']['content']['application/json'];
export type Context = Pick<MadekContextsResponse[number], 'id' | 'labels'>;
export type Contexts = Context[];
