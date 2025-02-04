interface User {
	id: number;
	name: string;
	email: string;
}

export default defineCachedEventHandler(
	async (event) => {
		const id = getRouterParam(event, "id");

		const user = await $fetch<User>(`/api/users/${id}`);

		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	},
	{
		// maxAge: 60 * 5, // Cache für 5 Minuten (300 Sekunden)
		// staleMaxAge: 60 * 60, // Falls möglich, bis zu 1 Stunde alte Daten senden
	}
);
