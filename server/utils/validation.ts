export function isValidRouteParameter(parameter: string | undefined): parameter is string {
	return parameter !== undefined && parameter !== '';
}
