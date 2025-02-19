import type { H3Event } from "h3";
import { getAuthHeader } from "./auth-service";

type MadekAuthInfo = {
	type: string;
	id: string;
	login: string;
	created_at: string;
	first_name: string;
	last_name: string;
	email_address: string;
	"authentication-method": string;
};

type AuthInfo = Pick<MadekAuthInfo, "first_name" | "last_name" | "email_address" | "authentication-method">;

export const getAuthInfo = defineCachedFunction(
	async (event: H3Event) => {
		const config = useRuntimeConfig();
		const authHeader = getAuthHeader();
		const result = await $fetch<MadekAuthInfo>(`${config.madekApi.baseUrl}/auth-info`, {
			headers: authHeader,
		});

		return {
			first_name: result.first_name,
			last_name: result.last_name,
			email_address: result.email_address,
			"authentication-method": result["authentication-method"],
		} satisfies AuthInfo;
	},
	{
		maxAge: 60 * 60,
		swr: false,
		getKey: (event: H3Event) => event.path,
	}
);
