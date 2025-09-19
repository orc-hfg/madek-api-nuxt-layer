interface RuntimeConfigOptions {
	enableServerSideCaching?: boolean;
	enableApiMock?: boolean;
}

export interface RuntimeConfigStructure {
	app: {
		baseURL: string;
	};
	madekApi: {
		token: string;
	};
	public: {
		enableApiMock: boolean;
		enableServerSideCaching: boolean;
		madekApi: {
			baseURL: string;
		};
	};
}

export function createRuntimeConfigMock(options: RuntimeConfigOptions = {}): RuntimeConfigStructure {
	return {
		app: {
			baseURL: '/',
		},
		madekApi: {
			token: 'test-api-token',
		},
		public: {
			enableApiMock: options.enableApiMock ?? false,
			enableServerSideCaching: options.enableServerSideCaching ?? true,
			madekApi: {
				baseURL: 'https://api.example.com/',
			},
		},
	};
}
