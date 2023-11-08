import { aggregate, readItems } from '@directus/sdk';

import { constructDirectus } from '$lib/shared/directus/client';
import type { SupabaseBrowserClient } from '$lib/shared/supabase/client';

export default async function query(client: SupabaseBrowserClient) {
	const { data, error } = await client
		.from('events')
		.select(
			`
			id,
			name,
			slug,
			description,
			meeting_time,
			event_point,
			event_categories ( key, icon, color )
		`
		)
		.order('meeting_time', { ascending: false });
	if (error) {
		throw error;
	}
	return data;
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
