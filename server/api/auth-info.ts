import { getAuthHeader } from "../utils/auth-service";
import { authInfoSchema } from "../utils/zod-schemas/auth-info";
import { ZodError } from "zod";

export default defineEventHandler(async (event) => {
	try {
		const authHeader = getAuthHeader();
		const rawResponse = await $fetch("https://dev.madek.hfg-karlsruhe.de/api-v2/auth-info", {
			headers: { Authorization: authHeader },
		});

		// const parsedResponse = authInfoSchema.parse(rawResponse);

		// return {
		// 	status: "success",
		// 	data: parsedResponse,
		// };

		return {
			status: "success",
			data: rawResponse,
		};
	} catch (error: any) {
		if (error instanceof ZodError) {
			throw createError({
				statusCode: 400,
				statusMessage: "Zod validation error",
				data: error.issues,
			});
		}

		throw createError({
			statusCode: error.statusCode || 500,
			message: error.message || "Something went wrong",
		});
	}
});
