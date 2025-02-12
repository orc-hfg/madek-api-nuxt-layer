export default defineEventHandler((event) => {
	if (import.meta.dev) {
		console.info(`[DEV LOG] ${event.node.req.method} ${event.node.req.url}`);
	}
});
