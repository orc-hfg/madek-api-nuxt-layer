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
							'!server/utils/__madek-api-tests__/**/*.test.ts',
						],
					},
				}),

				await defineVitestProject({
					root: '.',
					test: {
						name: { label: 'nuxt', color: 'magenta' },
						environment: 'nuxt',
						include: ['server/utils/__madek-api-tests__/**/*.test.ts'],
						setupFiles: ['server/utils/__madek-api-tests__/vitest.setup.ts'],
					},
				}),
			],
		},
	};
});
