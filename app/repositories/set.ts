import type { Collection, Collections, CollectionsUserQuery } from '../../server/types/collections';
import type { ApiFunction } from '../types/api';

interface SetRepository {
	getSets: (query?: CollectionsUserQuery) => Promise<Collections>;
	getSetById: (id: string) => Promise<Collection>;
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
