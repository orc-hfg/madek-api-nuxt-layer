import { getServerApi } from "../utils/api";

export default defineEventHandler(async (event) => {
	try {
		const config = useRuntimeConfig();
		const authHash = Buffer.from(`${config.madekApi.username}:${config.madekApi.password}`).toString("base64");

		// Direct fetch
		const response = await $fetch("https://dev.madek.hfg-karlsruhe.de/api-v2/auth-info", {
			headers: {
				Authorization: `Basic ${authHash}`,
				Accept: "application/json",
			},
		});

		console.log("Direct fetch response:", response);

		// API client
		// const api = getServerApi();
		// const response = await api.apiV2AuthInfoGet();

		// console.log("API client response:", response);

		return {
			status: "success",
			data: response,
		};
	} catch (error: any) {
		console.error("Auth error:", error);
		throw createError({
			statusCode: error.statusCode || 500,
			message: error.message || "Authentication failed",
			cause: error,
		});
	}
});
