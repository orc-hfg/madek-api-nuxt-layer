/*
 * Utility for building API URLs consistently across the application.
 * Combines app.baseURL and apiBaseName to create the base API path.
 *
 * Examples:
 * - Local: '/' + 'api' = '/api'
 * - Deployed: '/uploader/' + 'api' = '/uploader/api'
 */
export function buildApiBaseUrl(): string {
	const config = useRuntimeConfig();
	const { baseURL } = config.app;
	const { apiBaseName } = config.public;

	return `${baseURL}${apiBaseName}`;
}

/*
 * Builds a complete API URL by combining the base URL with an endpoint path.
 *
 * @param endpoint - The API endpoint path (e.g., '/previews/123/data-stream')
 * @returns The complete API URL
 *
 * Examples:
 * - Local: buildApiUrl('/previews/123/data-stream') = '/api/previews/123/data-stream'
 * - Deployed: buildApiUrl('/previews/123/data-stream') = '/uploader/api/previews/123/data-stream'
 */
export function buildApiUrl(endpoint: string): string {
	const baseUrl = buildApiBaseUrl();

	return `${baseUrl}${endpoint}`;
}
