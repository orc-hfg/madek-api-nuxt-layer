export type MockHandler = (parameters: Record<string, string | undefined>) => unknown;

export interface MockRoute {
	pattern: string;
	handler: MockHandler;
}

export interface MockResult {
	found: boolean;
	data: unknown;
}

const routes: MockRoute[] = [];

export function registerMockRoute(pattern: string, handler: MockHandler): void {
	routes.push({ pattern, handler });
}

export function findAndExecuteMockUrl(url: string): MockResult {
	for (const route of routes) {
		const matchResult = extractPathParameters(url, route.pattern);
		if (matchResult.matches) {
			const validParameters = getValidParameters(matchResult.parameters);

			return { found: true, data: route.handler(validParameters) };
		}
	}

	return { found: false, data: undefined };
}

export function getRegisteredMockPatterns(): string[] {
	return routes.map(route => route.pattern);
}
