import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
	root: '.',
	test: {
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
