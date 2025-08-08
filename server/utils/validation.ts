export function isValidRouteParameter(parameter: string | undefined): parameter is string {
	return typeof parameter === 'string' && parameter !== '';
}
