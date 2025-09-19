interface RuntimeConfigOptions {
	enableServerSideCaching?: boolean;
}

export interface RuntimeConfigStructure {
	app: {
		baseURL: string;
	};
	madekApi: {
		token: string;
	};
	public: {
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
			enableServerSideCaching: options.enableServerSideCaching ?? true,
			madekApi: {
				baseURL: 'https://api.example.com/',
			},
		},
	};
}
