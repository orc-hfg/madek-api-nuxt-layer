import type { Collections, CollectionsUserQuery } from '../../shared/types/collections';
import type { ApiFunction } from '../types/api';

interface SetsRepository {
	getSets: (query?: CollectionsUserQuery) => Promise<Collections>;
}

function createSetsRepository($madekApi: ApiFunction): SetsRepository {
	return {
		async getSets(query): Promise<Collections> {
			return $madekApi('/collections', {
				query,
			});
		},
	};
}

export function getSetsRepository(): SetsRepository {
	const { $madekApi } = useNuxtApp();

	return createSetsRepository($madekApi as ApiFunction);
}
