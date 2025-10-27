/*
 * Supported mock scenarios for E2E testing
 */
const MOCK_SCENARIOS = ['empty'] as const;

export type MockScenario = typeof MOCK_SCENARIOS[number];

function isMockScenario(value: unknown): value is MockScenario {
	return (
		typeof value === 'string'
		&& (MOCK_SCENARIOS as readonly string[]).includes(value)
	);
}

/*
 * Composable to read mock scenario from URL query parameters
 * Used for E2E testing to simulate different data states
 *
 * Example usage in component:
 * const mockScenario = useMockScenario();
 * await setsStore.refresh(locale.value, mockScenario);
 *
 * Example E2E test:
 * await page.goto('/projekte?mock_scenario=empty');
 */
export function useMockScenario(): MockScenario | undefined {
	const route = useRoute();
	const value = route.query.mock_scenario;

	if (isMockScenario(value)) {
		return value;
	}

	return undefined;
}
