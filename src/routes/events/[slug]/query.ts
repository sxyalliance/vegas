import { constructDirectus } from '$lib/shared/directus/client';
import { readItems } from '@directus/sdk';

export default async function query(slug: string, customFetch = fetch) {
	return constructDirectus(customFetch).request(
		readItems('events', {
			filter: {
				slug: {
					_eq: slug
				}
			},
			fields: ['*', { category: ['key', 'icon', 'color'] }, { proposer: ['id', 'first_name'] }],
			limit: 1
		})
	);
}
