import type { SupabaseBrowserClient } from '$lib/shared/supabase/client';

export default async function query(id: number, client: SupabaseBrowserClient) {
	const { data, error } = await client
		.from('events')
		.select(
			`
			*,
			category: event_categories(key, icon, color),
			proposer: profiles(id, nickname, avatar_url)
		`
		)
		.eq('id', id)
		.single();
	if (error) {
		throw error;
	}
	return data;
}
