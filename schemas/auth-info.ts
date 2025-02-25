import type { paths } from '../generated/api/schema';

export type MadekAuthInfoResponse = paths['/api-v2/auth-info']['get']['responses']['200']['schema'];
export type MadekAuthInfoData = MadekAuthInfoResponse['data'];
export type AuthInfo = Pick<MadekAuthInfoData, 'id' | 'first_name' | 'last_name'>;
