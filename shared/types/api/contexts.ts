import type { paths } from '../../../generated/api/schema';

export type MadekContextsResponse = paths['/api-v2/contexts/']['get']['responses']['200']['schema'];
export type Context = Pick<MadekContextsResponse[number], 'id' | 'labels'>;
export type Contexts = Context[];
