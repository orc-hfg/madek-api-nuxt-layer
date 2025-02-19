export function getAuthHeader() {
	const config = useRuntimeConfig();
	const token = config.madekApi.token;

	return { Authorization: `token ${token}` };
}
