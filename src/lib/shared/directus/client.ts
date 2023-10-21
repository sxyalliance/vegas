import type { CustomDirectusTypes } from './types';
import { createDirectus, rest } from '@directus/sdk';
import { dev } from '$app/environment';

export type ConstructedDirectusClient = ReturnType<typeof constructDirectus>;

export const constructDirectus = (customFetch: typeof fetch = fetch) => {
	return createDirectus<CustomDirectusTypes>(
		dev ? 'http://localhost:5173/apid' : 'https://apid.sxya.org',
		{
			globals: {
				fetch: customFetch
			}
		}
	).with(rest());
};
