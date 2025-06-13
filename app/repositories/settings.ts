import type { AppSettings } from '../../shared/types/api/app-settings';
import type { ApiFunction } from '../types/api';

interface SettingsRepository {
	getAppSettings: () => Promise<AppSettings>;
}

function createSettingsRepository($madekApi: ApiFunction): SettingsRepository {
	return {
		async getAppSettings(): Promise<AppSettings> {
			return $madekApi('/app-settings');
		},
	};
}

export function getSettingsRepository(): SettingsRepository {
	const { $madekApi } = useNuxtApp();

	return createSettingsRepository($madekApi as ApiFunction);
}
