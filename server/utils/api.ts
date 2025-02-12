import { DefaultApi } from "../../generated/api";
import { Configuration } from "../../generated/api/runtime";

let apiInstance: DefaultApi | null = null;

export function getServerApi(): DefaultApi {
	if (!apiInstance) {
		const config = useRuntimeConfig();

		if (!config.madekApi?.baseUrl) {
			throw createError({
				statusCode: 500,
				message: "Missing MADEK_API_BASE_URL configuration",
			});
		}

		if (!config.madekApi?.username || !config.madekApi?.password) {
			throw createError({
				statusCode: 500,
				message: "Missing MADEK API credentials",
			});
		}

		const authHash = Buffer.from(`${config.madekApi.username}:${config.madekApi.password}`).toString("base64");

		const configuration = new Configuration({
			basePath: config.madekApi.baseUrl,
			headers: {
				Accept: "application/json",
				Authorization: `Basic ${authHash}`,
			},
		});

		apiInstance = new DefaultApi(configuration);

		console.log("New API instance configuration:", apiInstance);
	}

	console.log("Return API instance configuration:", apiInstance);
	return apiInstance;
}

// import { DefaultApi } from "../../generated/api";
// import { Configuration } from "../../generated/api/runtime";

// let apiInstance: DefaultApi | null = null;

// export function getServerApi(): DefaultApi {
// 	if (!apiInstance) {
// 		const config = useRuntimeConfig();

// 		if (!config.madekApi?.baseUrl) {
// 			throw createError({
// 				statusCode: 500,
// 				message: "Missing MADEK_API_BASE_URL configuration",
// 			});
// 		}

// 		if (!config.madekApi?.username || !config.madekApi?.password) {
// 			throw createError({
// 				statusCode: 500,
// 				message: "Missing MADEK API credentials",
// 			});
// 		}

// 		const configuration = new Configuration({
// 			basePath: config.madekApi.baseUrl,
// 			username: config.madekApi.username,
// 			password: config.madekApi.password,
// 			headers: {
// 				Accept: "application/json",
// 			},
// 		});

// 		apiInstance = new DefaultApi(configuration);
// 	}

// 	return apiInstance;
// }
