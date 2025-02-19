import type { H3Event } from "h3";
import { useMadekApi } from "../../composables/useMadekApi";

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

export const getAuthInfo = async (event: H3Event) => {
	const { fetchFromApi } = useMadekApi(event);
	const result = await fetchFromApi<MadekAuthInfo>("/auth-info", {
		cache: {
			maxAge: 60 * 60,
			swr: false,
		},
	});

	return {
		first_name: result.first_name,
		last_name: result.last_name,
		email_address: result.email_address,
		"authentication-method": result["authentication-method"],
	} satisfies AuthInfo;
};
