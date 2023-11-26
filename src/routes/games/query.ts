import type { SupabaseBrowserClient } from '$lib/shared/supabase/client';

export default async function query(client: SupabaseBrowserClient) {
	const { data, error } = await client
		.from('games')
		.select(
			`
			id,
			provider,
			provider_identifier,
			name,
			image_url,
			formatted_price,
			description,
			upvote_count,
			downvote_count
			`
		)
		.order('upvote_count', { ascending: false });

	if (error) {
		throw error;
	}
	return data;
}
