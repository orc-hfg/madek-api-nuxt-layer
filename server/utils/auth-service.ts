export function getAuthHeader() {
	const config = useRuntimeConfig();
	const credentials = `${config.madekApi.username}:${config.madekApi.password}`;

	return `Basic ${Buffer.from(credentials).toString("base64")}`;
}
