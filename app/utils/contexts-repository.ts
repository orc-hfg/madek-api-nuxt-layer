import type { Context, Contexts } from '../../shared/types/api/contexts';
import type { ApiFunction } from '../types/api';

interface ContextRepository {
	getContextById: (id: string) => Promise<Context>;
	getContexts: () => Promise<Contexts>;
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
