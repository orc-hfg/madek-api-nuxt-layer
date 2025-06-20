import { MILLISECONDS_IN_SECOND } from '../constants/time';
import { sleep } from '../utils/sleep';

export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig(event);

	if (import.meta.dev && runtimeConfig.delayResponse) {
		await sleep(MILLISECONDS_IN_SECOND);
	}
});
