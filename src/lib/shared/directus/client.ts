import type { CustomDirectusTypes } from './types';
import { createDirectus, rest } from '@directus/sdk';

export type ConstructedDirectusClient = ReturnType<typeof constructDirectus>;

export const constructDirectus = (customFetch: typeof fetch = fetch) => {
	return createDirectus<CustomDirectusTypes>('https://apid.sxya.org', {
		globals: {
			fetch: customFetch
		}
	}).with(rest());
};
