import { MILLISECONDS_IN_SECOND } from '../../shared/constants/time';
import { createServerLogger } from '../utils/server-logger';

async function sleep(milliseconds: number): Promise<void> {
	return new Promise((resolve, _reject) => {
		setTimeout(resolve, milliseconds);
	});
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const isResponseDelayEnabled = Boolean(config.public.enableResponseDelay);

	if (import.meta.dev && isResponseDelayEnabled) {
		const serverLogger = createServerLogger(event);
		serverLogger.info('Middleware: delay-response', `Delaying response by ${MILLISECONDS_IN_SECOND}ms`);

		await sleep(MILLISECONDS_IN_SECOND);
	}
});
