import type { H3Error, RequestHeaders } from 'h3';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { vi } from 'vitest';
import { TEST_COOKIE } from '../../../shared/constants/test';

interface RuntimeConfig {
	public: {
		madekApi: {
			baseURL: string;
		};
	};
	madekApi: {
		token: string;
	};
}

function runtimeConfigMock(): RuntimeConfig {
	return {
		public: {
			madekApi: {
				baseURL: 'https://api.example.com/',
			},
		},
		madekApi: {
			token: 'test-api-token',
		},
	};
}

function routerMock() {
	return {
		afterEach: vi.fn(),
	};
}

function getRequestHeadersMock(): RequestHeaders {
	return {
		cookie: TEST_COOKIE,
	};
}

mockNuxtImport('useRuntimeConfig', () => runtimeConfigMock);

mockNuxtImport('useRouter', () => routerMock);

vi.mock('h3', () => {
	return {
		getRequestHeaders: (): RequestHeaders => getRequestHeadersMock(),
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
