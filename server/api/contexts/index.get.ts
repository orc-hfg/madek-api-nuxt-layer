import type { H3Event } from 'h3';
import { mockData } from '../../madek-api-mock/data';
import { getContexts } from '../../madek-api-services/contexts';
import { getApiMockOrExecute } from '../../madek-api-services/mock-handler';

export default defineEventHandler(async (event: H3Event) => getApiMockOrExecute(
	event,
	'API: contexts',
	'Returning mock: contexts',
	undefined,
	() => mockData.getContexts(),
	async () => getContexts(event),
));
