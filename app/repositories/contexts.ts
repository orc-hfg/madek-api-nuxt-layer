// TODO: Check if this repository is or will be needed

import type { ApiFunction } from '../types/api';

interface ContextRepository {
	getContexts: () => Promise<Contexts>;
	getContextById: (id: string) => Promise<Context>;
}

function createContextsRepository($madekApi: ApiFunction): ContextRepository {
	return {
		async getContexts(): Promise<Contexts> {
			return $madekApi('/contexts');
		},

		async getContextById(id): Promise<Context> {
			return $madekApi(`/contexts/${id}`);
		},
	};
}

export function getContextsRepository(): ContextRepository {
	const { $madekApi } = useNuxtApp();

	return createContextsRepository($madekApi as ApiFunction);
}
