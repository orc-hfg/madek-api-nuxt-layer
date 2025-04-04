import type { paths } from '../../../generated/api/schema';

export type MadekAppSettingsResponse = paths['/api-v2/app-settings']['get']['responses']['200']['schema'];
export type AppSettings = Pick<MadekAppSettingsResponse, 'default_locale'>;
