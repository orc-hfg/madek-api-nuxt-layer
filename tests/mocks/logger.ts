import type { MockInstance } from 'vitest';
import type { Logger } from '../../shared/utils/logger';
import { vi } from 'vitest';
import * as appLoggerModule from '../../app/utils/app-logger';
import * as serverLoggerModule from '../../server/utils/server-logger';

interface MockLoggerResult {
	debugSpy: ReturnType<typeof vi.spyOn>;
	infoSpy: ReturnType<typeof vi.spyOn>;
	warnSpy: ReturnType<typeof vi.spyOn>;
	errorSpy: ReturnType<typeof vi.spyOn>;
	logger: Logger;
}

interface BaseLoggerSpies {
	loggerInfoSpy: MockInstance;
	loggerWarnSpy: MockInstance;
	loggerErrorSpy: MockInstance;
}

interface DirectLoggerMock extends BaseLoggerSpies {
	mockLogger: Logger;
}

interface AppLoggerMock extends BaseLoggerSpies {
	appLoggerSpy: MockInstance;
}

export interface ServerLoggerMock extends BaseLoggerSpies {
	serverLoggerSpy: MockInstance;
}

export function createMockLogger(): Logger {
	return {
		debug: vi.fn(),
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
	};
}

function createMockLoggerWithSpies(): MockLoggerResult {
	const mockLogger = createMockLogger();

	const debugSpy = vi.spyOn(mockLogger, 'debug');
	const infoSpy = vi.spyOn(mockLogger, 'info');
	const warnSpy = vi.spyOn(mockLogger, 'warn');
	const errorSpy = vi.spyOn(mockLogger, 'error');

	return {
		debugSpy,
		infoSpy,
		warnSpy,
		errorSpy,
		logger: mockLogger,
	};
}

function createBaseLoggerSpies(): { logger: Logger } & BaseLoggerSpies {
	const mockLoggerSetup = createMockLoggerWithSpies();

	return {
		logger: mockLoggerSetup.logger,
		loggerInfoSpy: mockLoggerSetup.infoSpy,
		loggerWarnSpy: mockLoggerSetup.warnSpy,
		loggerErrorSpy: mockLoggerSetup.errorSpy,
	};
}

// For tests where logger is passed directly as parameter (like error-handling.test.ts)
export function setupDirectLoggerMock(): DirectLoggerMock {
	const { logger, ...spies } = createBaseLoggerSpies();

	return {
		mockLogger: logger,
		...spies,
	};
}

// For tests where service creates logger internally via createAppLogger (like set.test.ts)
export function setupAppLoggerMock(): AppLoggerMock {
	const { logger, ...spies } = createBaseLoggerSpies();
	const appLoggerSpy = vi.spyOn(appLoggerModule, 'createAppLogger').mockReturnValue(logger);

	return {
		appLoggerSpy,
		...spies,
	};
}

// For tests where service creates logger internally via createServerLogger
export function setupServerLoggerMock(): ServerLoggerMock {
	const { logger, ...spies } = createBaseLoggerSpies();
	const serverLoggerSpy = vi.spyOn(serverLoggerModule, 'createServerLogger').mockReturnValue(logger);

	return {
		serverLoggerSpy,
		...spies,
	};
}
