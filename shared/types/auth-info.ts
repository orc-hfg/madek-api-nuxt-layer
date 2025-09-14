// Manual definition since the OpenAPI schema structure has changed
export interface MadekAuthInfoResponse {
	id: string;
	login: string;
	email: string;
	first_name: string;
	last_name: string;
	institutional_id?: string;
	institutional_name?: string;
}

export type AuthInfo = Pick<MadekAuthInfoResponse, 'id' | 'login' | 'first_name' | 'last_name'>;
