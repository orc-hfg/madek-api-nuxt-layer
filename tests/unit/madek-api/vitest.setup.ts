import type { H3Error } from 'h3';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { vi } from 'vitest';
import { TEST_COOKIE } from '../../../shared/constants/test';

function getRequestHeadersMock() {
	return {
		cookie: TEST_COOKIE,
	};
}

// Mock payload composables to prevent Pinia payload errors
mockNuxtImport('definePayloadReviver', () => vi.fn());

// Mock $fetch with create method
const fetchMock = vi.fn().mockResolvedValue({});
// eslint-disable-next-line test/prefer-spy-on, ts/no-unsafe-member-access
(fetchMock as any).create = vi.fn().mockReturnValue(fetchMock);

// Prevent 'Error fetching app manifest' error
vi.mock('#app/composables/manifest', () => {
	return {
		getAppManifest: vi.fn().mockResolvedValue({ routes: {} }),
	};
});

vi.mock('h3', () => {
	return {
		getRequestHeaders: () => getRequestHeadersMock(),
		createError: (options: { statusCode?: number; statusMessage?: string; data?: unknown } = {}): H3Error => {
			const { statusCode = 500, statusMessage = 'Internal Server Error', data } = options;
			const error = new Error(statusMessage) as H3Error;
			error.statusCode = statusCode;
			error.statusMessage = statusMessage;
			error.data = data;
			error.fatal = true;
			error.unhandled = false;

			return error;
		},
	};
});
