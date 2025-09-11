import type { H3Event } from 'h3';
import { getCollections } from '../madek-api-services/collections';

export default defineEventHandler(async (event: H3Event) => {
	const query = getQuery<CollectionsQuery>(event);
	const collections = await getCollections(event, query);

	return collections;
});
