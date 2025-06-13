import type { H3Event } from 'h3';
import { getContexts } from '../../madek-api-services/contexts';

export default defineEventHandler(async (event: H3Event) => {
	const contexts = await getContexts(event);

	return contexts;
});
