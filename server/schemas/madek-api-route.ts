import { z } from 'zod';

/*
 * Base schema for non-empty strings
 * Individual ID schemas extend this with branded type transformations
 */
const nonEmptyStringSchema = z.string().trim().min(1, 'Parameter cannot be empty.');

/*
 * Branded ID schemas with Zod transformation
 * The .transform() casts validated strings to their branded types
 * Grouped by category: User/Person, Content, Metadata, Media
 */
const userIdSchema = z.string().optional().transform((id): UserId | undefined => ((id !== undefined && id !== '') ? toUserId(id) : undefined));
const personIdSchema = nonEmptyStringSchema.transform(toPersonId);
const collectionIdSchema = nonEmptyStringSchema.transform(toCollectionId);
const mediaEntryIdSchema = nonEmptyStringSchema.transform(toMediaEntryId);
const metaKeyIdSchema = nonEmptyStringSchema.transform(toMetaKeyId);
const previewIdSchema = nonEmptyStringSchema.transform(toPreviewId);

export const routeParameterSchemas = {
	// Single ID parameters (grouped by category: User/Person, Content, Metadata, Media)
	personId: z.object({
		id: personIdSchema,
	}),
	collectionId: z.object({
		collection_id: collectionIdSchema,
	}),
	mediaEntryId: z.object({
		media_entry_id: mediaEntryIdSchema,
	}),
	metaKeyId: z.object({
		meta_key_id: metaKeyIdSchema,
	}),
	metaKeysId: z.object({
		id: metaKeyIdSchema,
	}),
	previewId: z.object({
		preview_id: previewIdSchema,
	}),

	// Combined parameters for meta-datum endpoints
	collectionMetaDatum: z.object({
		collection_id: collectionIdSchema,
		meta_key_id: metaKeyIdSchema,
	}),
	mediaEntryMetaDatum: z.object({
		media_entry_id: mediaEntryIdSchema,
		meta_key_id: metaKeyIdSchema,
	}),
} as const;

export const routeQuerySchemas = {
	mediaEntryPreview: z.object({
		// Add additional media types as needed
		media_type: z.enum(['image']).optional(),
	}),
	collections: z.object({
		responsible_user_id: userIdSchema,
		filter_by: z.string().optional(),

		/*
		 * Optional test scenario parameter for E2E testing
		 * Example: ?mock_scenario=empty
		 */
		mock_scenario: z.string().optional(),
	}),
} as const;
