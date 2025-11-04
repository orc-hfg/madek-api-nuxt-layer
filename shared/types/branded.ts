/*
 * Branded Types for IDs
 *
 * These branded types prevent accidental mixing of different ID types.
 * For example, a CollectionId cannot be passed where a MediaEntryId is expected.
 *
 * Implementation:
 * - Each ID type is a string with a unique brand property
 * - The brand property is readonly and only exists at compile-time
 * - Zero runtime overhead - these are just type annotations
 *
 * Usage with helper functions (recommended):
 * const collectionId = toCollectionId('abc-123');
 * const mediaEntryId = toMediaEntryId(response.id);
 *
 * Usage with Zod schemas:
 * const schema = z.string().min(1).transform(toCollectionId);
 *
 * Usage in functions:
 * function getCollection(id: CollectionId) { ... }
 *
 * Type safety:
 * const collectionId = toCollectionId('abc');
 * const mediaEntryId = toMediaEntryId('xyz');
 * getCollection(mediaEntryId); // ✗ TypeScript error
 * getCollection(collectionId); // ✓ works
 */

/*
 * User and Person IDs
 */
export type UserId = { readonly __brand: 'UserId' } & string;
export type PersonId = { readonly __brand: 'PersonId' } & string;

/*
 * Content IDs
 */
export type CollectionId = { readonly __brand: 'CollectionId' } & string;
export type MediaEntryId = { readonly __brand: 'MediaEntryId' } & string;

/*
 * Metadata IDs
 */
export type MetaKeyId = { readonly __brand: 'MetaKeyId' } & string;
export type MetaDatumId = { readonly __brand: 'MetaDatumId' } & string;
export type KeywordId = { readonly __brand: 'KeywordId' } & string;
export type RoleId = { readonly __brand: 'RoleId' } & string;

/*
 * Media and Preview IDs
 */
export type PreviewId = { readonly __brand: 'PreviewId' } & string;

/*
 * Helper Functions for Branded Type Casting
 *
 * These functions provide a centralized way to cast strings to branded types.
 *
 * Benefits:
 * - Single source of truth for casting logic
 * - Consistent syntax across the codebase
 * - Easy to add runtime validation later if needed
 * - More readable than inline 'as' casts
 *
 * Usage:
 * const id = toCollectionId('abc-123');
 * const userId = toUserId(response.id);
 */
export function toUserId(id: string): UserId {
	return id as UserId;
}

export function toPersonId(id: string): PersonId {
	return id as PersonId;
}

export function toCollectionId(id: string): CollectionId {
	return id as CollectionId;
}

export function toMediaEntryId(id: string): MediaEntryId {
	return id as MediaEntryId;
}

export function toMetaKeyId(id: string): MetaKeyId {
	return id as MetaKeyId;
}

export function toMetaDatumId(id: string): MetaDatumId {
	return id as MetaDatumId;
}

export function toKeywordId(id: string): KeywordId {
	return id as KeywordId;
}

export function toRoleId(id: string): RoleId {
	return id as RoleId;
}

export function toPreviewId(id: string): PreviewId {
	return id as PreviewId;
}
