import { z } from 'zod';

const nonEmptyStringSchema = z.string().trim().min(1, 'Parameter cannot be empty.');

export const routeParameterSchemas = {
	previewId: z.object({
		preview_id: nonEmptyStringSchema,
	}),
	collectionId: z.object({
		collection_id: nonEmptyStringSchema,
	}),
	mediaEntryId: z.object({
		media_entry_id: nonEmptyStringSchema,
	}),
	metaKeysId: z.object({
		id: nonEmptyStringSchema,
	}),
	metaKeyId: z.object({
		meta_key_id: nonEmptyStringSchema,
	}),
	collectionMetaDatum: z.object({
		collection_id: nonEmptyStringSchema,
		meta_key_id: nonEmptyStringSchema,
	}),
} as const;

export const routeQuerySchemas = {
	mediaEntryPreview: z.object({
		// Add additional media types as needed
		media_type: z.enum(['image']).optional(),
	}),
	collections: z.object({
		responsible_user_id: z.string().optional(),
		filter_by: z.string().optional(),
	}),
} as const;
