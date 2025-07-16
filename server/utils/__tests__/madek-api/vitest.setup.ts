import type { RequestHeaders } from 'h3';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { vi } from 'vitest';
import { TEST_COOKIE } from '../../../../test/helpers/test-constants';

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

function getRequestHeadersMock(): RequestHeaders {
	return {
		cookie: TEST_COOKIE,
	};
}

mockNuxtImport('useRuntimeConfig', () => runtimeConfigMock);
vi.mock('h3', () => {
	return {
		getRequestHeaders: (): RequestHeaders => getRequestHeadersMock(),
	};
});
