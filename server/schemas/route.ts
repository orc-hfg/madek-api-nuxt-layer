import { z } from 'zod';

const nonEmptyStringSchema = z.string().trim().min(1, 'Parameter cannot be empty.');

export const routeParameterSchemas = {
	// Single parameter schemas
	previewId: z.object({
		preview_id: nonEmptyStringSchema,
	}),
	collectionId: z.object({
		collection_id: nonEmptyStringSchema,
	}),
	mediaEntryId: z.object({
		media_entry_id: nonEmptyStringSchema,
	}),
	metaKeyId: z.object({
		meta_key_id: nonEmptyStringSchema,
	}),

	// Multi-parameter schemas
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
} as const;
