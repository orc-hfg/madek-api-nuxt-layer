function isValidParameterValue(value: string | undefined): value is string {
	return value !== undefined && value.trim() !== '';
}

export function getValidParameters(
	parameters: Record<string, string | undefined>,
): Record<string, string> {
	const validParameters: Record<string, string> = {};

	for (const [key, value] of Object.entries(parameters)) {
		if (isValidParameterValue(value)) {
			validParameters[key] = value;
		}
	}

	return validParameters;
}

export function validateParameters(
	logger: Logger,
	parameters: Record<string, string | undefined>,
	...requiredKeys: string[]
): void {
	const invalidParameters = requiredKeys.filter(key => !isValidParameterValue(parameters[key]));

	if (invalidParameters.length > 0) {
		const parameterWord = invalidParameters.length === 1 ? 'parameter' : 'parameters';
		logger.error(`Invalid ${parameterWord}: ${invalidParameters.join(', ')}`);
	}
}
