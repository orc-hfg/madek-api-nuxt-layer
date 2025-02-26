import { sleep } from '../../shared/utils/sleep';

export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig(event);

	if (import.meta.dev && runtimeConfig.delayResponse) {
		await sleep(1000);
	}
});
