import type { DirectusClient, RestClient } from '@directus/sdk';
import type { DirectusSchema } from '../../../../directus';
import { createDirectus, rest } from '@directus/sdk';

export type ConstructedDirectusClient = DirectusClient<DirectusSchema> & RestClient<DirectusSchema>;

export const constructDirectus = (customFetch: typeof window.fetch) => {
	return createDirectus<DirectusSchema>('http://apid.sxya.org:18055', {
		globals: {
			fetch: customFetch
		}
	}).with(rest());
};
