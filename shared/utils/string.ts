export function isNonEmptyString(value: string | null | undefined): value is string {
	return value !== null && value !== undefined && value.trim() !== '';
}

export function isEmptyString(value: string | null | undefined): boolean {
	return !isNonEmptyString(value);
}
