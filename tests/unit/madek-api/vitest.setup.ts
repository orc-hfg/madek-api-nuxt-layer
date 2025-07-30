import type { RequestHeaders } from 'h3';
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

mockNuxtImport('useRuntimeConfig', () => runtimeConfigMock);

function getRequestHeadersMock(): RequestHeaders {
	return {
		cookie: TEST_COOKIE,
	};
}

vi.mock('h3', () => {
	return {
		getRequestHeaders: (): RequestHeaders => getRequestHeadersMock(),
	};
});
