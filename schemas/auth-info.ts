import { z } from "zod";

// Full API response schema
export const MadekAuthInfoSchema = z.object({
	type: z.literal("User2"),
	id: z.string().uuid(),
	login: z.string(),
	created_at: z.string().datetime(),
	first_name: z.string(),
	last_name: z.string(),
	email_address: z.string().email(),
	"authentication-method": z.literal("Token"),
});

// Schema for the picked fields we actually use
export const AuthInfoSchema = MadekAuthInfoSchema.pick({
	first_name: true,
	last_name: true,
	email_address: true,
	"authentication-method": true,
});

export type MadekAuthInfo = z.infer<typeof MadekAuthInfoSchema>;
export type AuthInfo = z.infer<typeof AuthInfoSchema>;
