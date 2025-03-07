import type { Collection, Collections, CollectionsQuery } from '../../shared/types/api/collections';

interface SetRepository {
	getSets: (parameters?: CollectionsQuery) => Promise<Collections>;
	getSetById: (id: string) => Promise<Collection>;
}

export function useSetRepository(): SetRepository {
	return {
		async getSets(parameters?: CollectionsQuery): Promise<Collections> {
			return $fetch('/api/collections', {
				params: parameters,
			});
		},

		async getSetById(id: string): Promise<Collection> {
			return $fetch(`/api/collections/${id}`);
		},
	};
}
