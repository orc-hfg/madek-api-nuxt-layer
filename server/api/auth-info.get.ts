import { getAuthInfo } from '../utils/auth-info';
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const authInfo = await getAuthInfo(event);

	return authInfo;
});
