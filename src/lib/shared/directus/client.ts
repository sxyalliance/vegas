import { dev } from '$app/environment';
import { createDirectus, rest } from '@directus/sdk';

import type { CustomDirectusTypes } from './types';

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
