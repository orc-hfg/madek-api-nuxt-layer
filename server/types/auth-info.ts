import type { paths } from '../../generated/api/schema';

export type MadekAuthInfoResponse = paths['/api-v2/auth-info']['get']['responses']['200']['schema']['data'];
export type AuthInfo = Pick<MadekAuthInfoResponse, 'id' | 'login' | 'first_name' | 'last_name'>;
