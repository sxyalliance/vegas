import { constructDirectus } from '$lib/shared/directus/client';
import { aggregate, readItems } from '@directus/sdk';

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
			],
			sort: '-meeting_time'
		})
	);
}

export function queryCategories(customFetch = fetch) {
	return constructDirectus(customFetch).request(
		readItems('event_categories', {
			fields: ['key', 'icon', 'color'],
			sort: 'sort'
		})
	);
}

export function queryCategoriesEventsCount(customFetch = fetch) {
	return constructDirectus(customFetch).request(
		aggregate('events', {
			aggregate: { count: '*' },
			groupBy: ['category']
		})
	);
}
