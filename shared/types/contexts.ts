import type { paths } from '../../generated/api/madek-api';

export type MadekContextsResponse = paths['/api-v2/contexts']['get']['responses']['200']['content']['application/json'];
export type Context = Pick<MadekContextsResponse[number], 'id' | 'labels'>;
export type Contexts = Context[];
