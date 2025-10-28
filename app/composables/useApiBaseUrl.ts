export function useApiBaseUrl(): string {
	const config = useRuntimeConfig();

	return `${config.app.baseURL}${config.public.apiBaseName}`;
}
