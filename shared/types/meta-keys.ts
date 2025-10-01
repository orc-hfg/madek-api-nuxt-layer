import type { paths } from '../../generated/api/madek-api';

type MadekMetaKeysGet = paths['/api-v2/meta-keys/{id}']['get'];

export type MadekMetaKeysGetPathParameters = MadekMetaKeysGet['parameters']['path'];

// Override the labels type directly in the API response type
export type MadekMetaKeysGetResponse = {
	labels: Record<'de' | 'en', string>;
} & Omit<MadekMetaKeysGet['responses']['200']['content']['application/json'], 'labels'>;

export type MetaKeyLabels = Pick<MadekMetaKeysGetResponse, 'labels'>;
