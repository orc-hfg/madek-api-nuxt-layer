import { defineVitestProject } from '@nuxt/test-utils/config';
import { defineConfig } from 'vitest/config';

export default defineConfig(async () => {
	return {
		test: {
			projects: [
				await defineVitestProject({
					root: '.',
					test: {
						name: { label: 'node', color: 'cyan' },
						environment: 'node',
						include: [
							'**/*.test.ts',
							'!tests/unit/madek-api/**/*.test.ts',
						],
					},
				}),

				await defineVitestProject({
					root: '.',
					test: {
						name: { label: 'nuxt', color: 'magenta' },
						environment: 'nuxt',
						include: ['tests/unit/madek-api/**/*.test.ts'],
						setupFiles: ['tests/unit/madek-api/vitest.setup.ts'],
					},
				}),
			],
		},
	};
});
