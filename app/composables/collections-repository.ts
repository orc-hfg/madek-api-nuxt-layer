import type { Collection, Collections, CollectionsQuery } from '../../shared/types/api/collections';

interface CollectionsRepository {
	getCollections: (parameters?: CollectionsQuery) => Promise<Collections>;
	getCollectionById: (id: string) => Promise<Collection>;
}

interface ApiInstance {
	<T>(url: string, options?: any): Promise<T>;
}

export function createCollectionsRepository($api: ApiInstance): CollectionsRepository {
	return {
		async getCollections(parameters?: CollectionsQuery): Promise<Collections> {
			return $api('/collections', {
				params: parameters,
			});
		},

		async getCollectionById(id: string): Promise<Collection> {
			return $api(`/collections/${id}`);
		},
	};
}

export function useCollectionsRepository(): CollectionsRepository {
	const { $api } = useNuxtApp();
	return createCollectionsRepository($api);
}
