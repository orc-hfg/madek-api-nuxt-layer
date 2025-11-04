import type { paths } from '../../generated/api/madek-api';
import type { CollectionId, UserId } from './branded';

/*
 * Collections API Type Definitions
 *
 * IMPORTANT: The generated OpenAPI types define query parameters as optional:
 * `readonly query?: { ... }`
 *
 * This causes TypeScript to resolve Pick operations to 'never' because the query
 * object itself could be undefined. We use NonNullable to extract the actual
 * query type, removing null/undefined possibilities.
 *
 * Without NonNullable:
 * - Type resolves to: Pick<undefined, 'responsible_user_id' | 'filter_by'>
 * - Result: never (TypeScript error)
 *
 * With NonNullable:
 * - Type resolves to: Pick<QueryObject, 'responsible_user_id' | 'filter_by'>
 * - Result: { responsible_user_id?: string; filter_by?: string; }
 */
type MadekCollectionsGet = paths['/api-v2/collections']['get'];

type MadekCollectionsQuery = NonNullable<MadekCollectionsGet['parameters']['query']>;

type MadekCollectionsQueryBase = Pick<MadekCollectionsQuery, 'responsible_user_id' | 'filter_by'>;

/*
 * Query parameters for collections endpoint.
 *
 * Note: responsible_user_id uses UserId (Branded Type) because the
 * route schema transforms the raw string parameter to branded type
 * via Zod schema. See server/schemas/madek-api-route.ts
 */
export interface CollectionsQuery {
	readonly responsible_user_id?: UserId;
	readonly filter_by?: MadekCollectionsQueryBase['filter_by'];
}

type MadekCollectionsArray = MadekCollectionsGet['responses']['200']['content']['application/json']['groups'];
export interface MadekCollectionsResponse {
	readonly collections: MadekCollectionsArray;
}

export interface Collection {
	readonly id: CollectionId;
}

export type Collections = Collection[];
