import type { Collection, Collections, CollectionsQuery } from '../../shared/types/api/collections';

interface SetRepository {
	getSets: (parameters?: CollectionsQuery) => Promise<Collections>;
	getSetById: (id: string) => Promise<Collection>;
}

interface ApiInstance {
	<T>(url: string, options?: any): Promise<T>;
}

export function createSetRepository($api: ApiInstance): SetRepository {
	return {
		async getSets(parameters?: CollectionsQuery): Promise<Collections> {
			return $api('/collections', {
				params: parameters,
			});
		},

		async getSetById(id: string): Promise<Collection> {
			return $api(`/collections/${id}`);
		},
	};
}

export function useSetRepository(): SetRepository {
	const { $api } = useNuxtApp();
	return createSetRepository($api);
}
