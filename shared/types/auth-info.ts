import type { UserId } from './branded';

/*
 * Manual definition since the OpenAPI schema structure has changed
 */
export interface MadekAuthInfoResponse {
	readonly id: string;
	readonly login: string;
	readonly email: string;
	readonly first_name: string;
	readonly last_name: string;
	readonly institutional_id?: string;
	readonly institutional_name?: string;
}

export interface AuthInfo {
	readonly id: UserId;
	readonly login: string;
	readonly first_name: string;
	readonly last_name: string;
}
