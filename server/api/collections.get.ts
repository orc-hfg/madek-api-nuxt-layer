import type { H3Event } from 'h3';
import { getCollections } from '../utils/collections';

export default defineEventHandler(async (event: H3Event) => {
	const collections = await getCollections(event, '82c76a74-3e83-428b-bf49-295d26206bce');

	return collections;
});
