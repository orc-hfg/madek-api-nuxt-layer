import type { H3Event } from 'h3';
import type { CollectionsUserQuery } from '../../shared/types/api/collections';

export default defineEventHandler(async (event: H3Event) => {
	const query = getQuery<CollectionsUserQuery>(event);
	const collections = await getCollections(event, query);

	return collections;
});
