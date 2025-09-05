import type { paths } from '../../generated/api/madek-api';

export type MadekAppSettingsResponse = paths['/api-v2/app-settings']['get']['responses']['200']['content']['application/json'];
export type AppSettings = Pick<MadekAppSettingsResponse, 'default_locale'>;
