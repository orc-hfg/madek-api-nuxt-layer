import type { H3Error } from 'h3';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { StatusCodes } from 'http-status-codes';
import { vi } from 'vitest';
import { TEST_COOKIE } from '../../../shared/constants/test';

interface RequestHeadersMock {
	cookie: string;
}

interface FetchMock {
	(...parameters: unknown[]): Promise<unknown>;
	create: () => FetchMock;
}

function getRequestHeadersMock(): RequestHeadersMock {
	return {
		cookie: TEST_COOKIE,
	};
}

// Mock payload composables to prevent Pinia payload errors
mockNuxtImport('definePayloadReviver', () => vi.fn());

// Mock $fetch with create method
const fetchMock = vi.fn().mockResolvedValue({}) as unknown as FetchMock;
fetchMock.create = vi.fn().mockReturnValue(fetchMock);

// Prevent 'Error fetching app manifest' error
vi.mock('#app/composables/manifest', () => {
	return {
		getAppManifest: vi.fn().mockResolvedValue({ routes: {} }),
	};
});

vi.mock('h3', () => {
	return {
		getRequestHeaders: (): RequestHeadersMock => getRequestHeadersMock(),
		createError: (options: { statusCode?: number; statusMessage?: string; data?: unknown } = {}): H3Error => {
			const { statusCode = StatusCodes.INTERNAL_SERVER_ERROR, statusMessage = 'Internal Server Error', data } = options;
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
