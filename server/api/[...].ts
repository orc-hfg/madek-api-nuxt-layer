import { joinURL } from "ufo";
import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
	const proxyUrl = useRuntimeConfig().apiBaseUrl;

	const path = (event.path || "").replace(/^\/api\//, "");
	const target = joinURL(proxyUrl, path);

	return proxyRequest(event, target);
});
