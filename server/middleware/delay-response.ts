import { MILLISECONDS_IN_SECOND } from '../constants/time';
import { sleep } from '../utils/sleep';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);

	if (import.meta.dev && config.delayResponse) {
		await sleep(MILLISECONDS_IN_SECOND);
	}
});
