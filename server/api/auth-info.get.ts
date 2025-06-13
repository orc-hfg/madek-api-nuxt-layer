import type { H3Event } from 'h3';
import { getAuthInfo } from '../madek-api-services/auth-info';

export default defineEventHandler(async (event: H3Event) => {
	const authInfo = await getAuthInfo(event);

	return authInfo;
});
