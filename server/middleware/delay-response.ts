import { sleep } from '../../shared/utils/sleep';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async () => {
	if (import.meta.dev && runtimeConfig.delayResponse) {
		await sleep(1000);
	}
});
