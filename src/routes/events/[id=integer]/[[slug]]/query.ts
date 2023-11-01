import { readItem } from '@directus/sdk';

import { constructDirectus } from '$lib/shared/directus/client';

export default async function query(id: number, customFetch = fetch) {
	return constructDirectus(customFetch).request(
		readItem('events', id, {
			fields: ['*', { category: ['key', 'icon', 'color'] }, { proposer: ['id', 'first_name'] }]
		})
	);
}
