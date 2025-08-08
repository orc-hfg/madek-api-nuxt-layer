import type { MetaDatum } from '../../server/types/collection-meta-datum';
import type { ApiFunction } from '../types/api';

interface SetRepository {
	getSetTitle: (setId: string) => Promise<MetaDatum>;
	getSetTitles: (setIds: string[]) => Promise<MetaDatum[]>;
}

function createSetRepository($madekApi: ApiFunction): SetRepository {
	return {
		async getSetTitle(setId: string): Promise<MetaDatum> {
			return $madekApi(`/collection/${setId}/meta-datum/madek_core:title`);
		},

		async getSetTitles(setIds: string[]): Promise<MetaDatum[]> {
			const titlePromises = setIds.map(async setId => this.getSetTitle(setId));

			return Promise.all(titlePromises);
		},
	};
}

export function getSetRepository(): SetRepository {
	const { $madekApi } = useNuxtApp();

	return createSetRepository($madekApi as ApiFunction);
}
