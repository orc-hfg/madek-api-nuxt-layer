import { mockNuxtImport } from '@nuxt/test-utils/runtime';

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
