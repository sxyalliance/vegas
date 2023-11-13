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

export async function queryCategories(client: SupabaseBrowserClient) {
	const { data, error } = await client
		.from('event_categories')
		.select('key, icon, color')
		.order('sort', { ascending: true });
	if (error) {
		throw error;
	}
	return data;
}
