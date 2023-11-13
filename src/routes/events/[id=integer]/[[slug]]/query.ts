import type { SupabaseBrowserClient } from '$lib/shared/supabase/client';

export default async function query(id: number, client: SupabaseBrowserClient) {
	const { data, error } = await client
		.from('events')
		.select(
			`
			*,
			category:event_categories(key, icon, color),
			proposer:members(id, email, nickname)
		`
		)
		.single();
	if (error) {
		throw error;
	}
	return data;
}
