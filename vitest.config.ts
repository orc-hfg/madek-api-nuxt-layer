import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
	root: '.',
	test: {
		/*
		 * WORKAROUND: Disable cache for @nuxt/test-utils macro transpilation
		 *
		 * Issue: mockNuxtImport() macros fail to transpile correctly when Vitest cache is enabled,
		 * causing "mockNuxtImport() is a macro and it did not get transpiled" errors.
		 *
		 * Symptoms:
		 * - Tests work after `npm run dev` but fail on subsequent runs
		 *
		 * Solution: cache: false provides more stable test execution (2 consecutive runs work)
		 *
		 * Trade-off: Slightly slower tests but more reliable execution
		 */
		cache: false,
		projects: [
			{
				extends: true,
				test: {
					name: { label: 'unit', color: 'cyan' },
					include: [
						'**/*.test.ts',
						'!tests/unit/madek-api/**/*.test.ts',
					],
				},
			},
			{
				extends: true,
				test: {
					name: { label: 'madek-api', color: 'magenta' },
					include: ['tests/unit/madek-api/**/*.test.ts'],
					setupFiles: ['tests/unit/madek-api/vitest.setup.ts'],
				},
			},
		],
	},
});
