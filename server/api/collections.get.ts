import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const query = { responsible_user_id: '82c76a74-3e83-428b-bf49-295d26206bce' };
	const collections = await getCollections(event, query);

	return collections;
});
