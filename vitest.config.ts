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
						'!server/utils/__tests__/madek-api/**/*.test.ts',
					],
				},
			},
			{
				extends: true,
				test: {
					name: { label: 'madek-api', color: 'magenta' },
					include: ['server/utils/__tests__/madek-api/**/*.test.ts'],
					setupFiles: ['server/utils/__tests__/madek-api/vitest.setup.ts'],
				},
			},
		],
	},
});
