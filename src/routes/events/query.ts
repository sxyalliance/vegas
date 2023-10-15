import { constructDirectus } from '$lib/shared/directus/client';
import { readItems } from '@directus/sdk';

export default function query(customFetch = fetch) {
	return constructDirectus(customFetch).request(
		readItems('events', {
			fields: [
				'id',
				'name',
				'slug',
				'description',
				'meeting_time',
				'status',
				{ category: ['key', 'icon', 'color'] },
				{ proposer: ['id', 'first_name'] }
			]
		})
	);
}

export function queryCategories(customFetch = fetch) {
	return constructDirectus(customFetch).request(
		readItems('event_categories', {
			fields: ['key', 'icon', 'color']
		})
	);
}
