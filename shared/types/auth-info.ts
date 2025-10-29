// Manual definition since the OpenAPI schema structure has changed
export interface MadekAuthInfoResponse {
	readonly id: string;
	readonly login: string;
	readonly email: string;
	readonly first_name: string;
	readonly last_name: string;
	readonly institutional_id?: string;
	readonly institutional_name?: string;
}

export type AuthInfo = Pick<MadekAuthInfoResponse, 'id' | 'login' | 'first_name' | 'last_name'>;
