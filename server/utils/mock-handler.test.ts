import type { H3Event } from 'h3';
import type { RuntimeConfigStructure } from '../../tests/mocks/runtime-config';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setupServerLoggerMock } from '../../tests/mocks/logger';
import { createRuntimeConfigMock } from '../../tests/mocks/runtime-config';
import { getApiMockOrExecute } from './mock-handler';

const mockEvent = {} as H3Event;

let runtimeConfigReturnValue: RuntimeConfigStructure;

function useRuntimeConfigMock() {
	return runtimeConfigReturnValue;
}

mockNuxtImport('useRuntimeConfig', () => useRuntimeConfigMock);

describe('getApiMockOrExecute()', () => {
	let mockDataFunction: ReturnType<typeof vi.fn>;
	let realApiFunction: ReturnType<typeof vi.fn>;
	let loggerMock: ReturnType<typeof setupServerLoggerMock>;

	beforeEach(() => {
		mockDataFunction = vi.fn();
		realApiFunction = vi.fn();
		loggerMock = setupServerLoggerMock();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should return mock data when API mocks are enabled', async () => {
		runtimeConfigReturnValue = createRuntimeConfigMock({ enableApiMock: true });
		const mockData = { id: 'test-mock-data' };
		mockDataFunction.mockReturnValue(mockData);
		realApiFunction.mockResolvedValue({ id: 'real-api-data' });

		const result = await getApiMockOrExecute<{ id: string }>(
			mockEvent,
			'Test Context',
			'Test mock message',
			{ testData: 'value' },
			mockDataFunction,
			realApiFunction,
		);

		expect(result).toStrictEqual(mockData);
		expect(mockDataFunction).toHaveBeenCalledOnce();
		expect(realApiFunction).not.toHaveBeenCalled();

		// Test logging behavior when mocks are enabled
		expect(loggerMock.serverLoggerSpy).toHaveBeenCalledWith(mockEvent, 'Test Context');
		expect(loggerMock.loggerInfoSpy).toHaveBeenCalledWith('Test mock message', { testData: 'value' });
	});

	it('should call real API function when API mocks are disabled', async () => {
		runtimeConfigReturnValue = createRuntimeConfigMock({ enableApiMock: false });
		const realData = { id: 'real-api-data' };
		mockDataFunction.mockReturnValue({ id: 'mock-data' });
		realApiFunction.mockResolvedValue(realData);

		const result = await getApiMockOrExecute<{ id: string }>(
			mockEvent,
			'Test Context',
			'Test message',
			undefined,
			mockDataFunction,
			realApiFunction,
		);

		expect(result).toStrictEqual(realData);
		expect(realApiFunction).toHaveBeenCalledOnce();
		expect(mockDataFunction).not.toHaveBeenCalled();
	});
});
