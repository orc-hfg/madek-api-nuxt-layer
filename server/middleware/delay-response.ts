import { MILLISECONDS_IN_SECOND } from '../../shared/constants/time';
import { isDevelopmentEnvironment } from '../../shared/utils/environment';
import { createServerLogger } from '../utils/server-logger';

async function sleep(milliseconds: number): Promise<void> {
	return new Promise((resolve, _reject) => {
		setTimeout(resolve, milliseconds);
	});
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const isResponseDelayEnabled = Boolean(config.public.enableResponseDelay);

	if (isDevelopmentEnvironment && isResponseDelayEnabled) {
		const serverLogger = createServerLogger(event, 'Middleware: delay-response');
		serverLogger.info('Delaying response by', `${MILLISECONDS_IN_SECOND}ms`);

		await sleep(MILLISECONDS_IN_SECOND);
	}
});
