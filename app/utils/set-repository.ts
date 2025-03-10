import type { Collection, Collections, CollectionsQuery } from '../../shared/types/api/collections';
import type { ApiFunction } from '../types/api';

interface SetRepository {
	getSets: (parameters?: CollectionsQuery) => Promise<Collections>;
	getSetById: (id: string) => Promise<Collection>;
}

function createSetRepository($madekApi: ApiFunction): SetRepository {
	return {
		async getSets(parameters?: CollectionsQuery): Promise<Collections> {
			return $madekApi('/collections', {
				params: parameters,
			});
		},

		async getSetById(id: string): Promise<Collection> {
			return $madekApi(`/collections/${id}`);
		},
	};
}

export function getSetRepository(): SetRepository {
	const { $madekApi } = useNuxtApp();

	return createSetRepository($madekApi);
}
