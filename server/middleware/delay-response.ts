import { MILLISECONDS_IN_SECOND } from '../../shared/constants/time';

async function sleep(milliseconds: number): Promise<void> {
	return new Promise((resolve, _reject) => {
		setTimeout(resolve, milliseconds);
	});
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);

	if (import.meta.dev && config.delayResponse) {
		await sleep(MILLISECONDS_IN_SECOND);
	}
});
