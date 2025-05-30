import type { Collection, Collections, CollectionsUserQuery } from '../../shared/types/api/collections';
import type { ApiFunction } from '../types/api';

interface SetRepository {
	getSetById: (id: string) => Promise<Collection>;
	getSets: (query?: CollectionsUserQuery) => Promise<Collections>;
}

function createSetRepository($madekApi: ApiFunction): SetRepository {
	return {
		async getSets(query): Promise<Collections> {
			return $madekApi('/collections', {
				query,
			});
		},

		async getSetById(id): Promise<Collection> {
			return $madekApi(`/collections/${id}`);
		},
	};
}

export function getSetRepository(): SetRepository {
	const { $madekApi } = useNuxtApp();

	return createSetRepository($madekApi as ApiFunction);
}
