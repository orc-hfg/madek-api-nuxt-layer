import type { Logger } from '../../shared/utils/logger';
import { vi } from 'vitest';

export interface MockLoggerResult {
	debugSpy: ReturnType<typeof vi.spyOn>;
	infoSpy: ReturnType<typeof vi.spyOn>;
	warnSpy: ReturnType<typeof vi.spyOn>;
	errorSpy: ReturnType<typeof vi.spyOn>;
	logger: Logger;
}

export function createMockLogger(): Logger {
	return {
		debug: vi.fn(),
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
	};
}

export function createMockLoggerWithSpies(): MockLoggerResult {
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
