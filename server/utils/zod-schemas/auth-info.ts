import { z } from "zod";

export const authInfoSchema = z.object({
	status: z.literal("success"),
	data: z.object({
		type: z.string(),
		id: z.string().uuid(),
		login: z.string(),
		created_at: z.string(),
		first_name: z.string(),
		last_name: z.string(),
		email_address: z.string().email(),
		"authentication-method": z.string(),
	}),
});
