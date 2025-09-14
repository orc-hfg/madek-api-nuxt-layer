import { createRouter } from 'radix3';
import { parsePath } from 'ufo';

interface UrlMatchResult {
	matches: boolean;
	parameters: Record<string, string | undefined>;
}

export function replacePathParameters(template: string, parameters: Record<string, string>): string {
	let result = template;

	for (const [key, value] of Object.entries(parameters)) {
		result = result.replace(`:${key}`, value);
	}

	return result;
}

export function extractPathParameters(url: string, pattern: string): UrlMatchResult {
	const { pathname } = parsePath(url);
	const router = createRouter();

	router.insert(pattern, { matched: true });

	const match = router.lookup(pathname);

	if (!match) {
		return { matches: false, parameters: {} };
	}

	return { matches: true, parameters: match.params ?? {} };
}
