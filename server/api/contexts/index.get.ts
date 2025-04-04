import type { H3Event } from 'h3';
import { getContexts } from '../../utils/contexts';

export default defineEventHandler(async (event: H3Event) => {
	const contexts = await getContexts(event);

	return contexts;
});
