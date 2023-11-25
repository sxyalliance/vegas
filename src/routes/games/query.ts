import type { SupabaseBrowserClient } from '$lib/shared/supabase/client';

export default async function query(client: SupabaseBrowserClient) {
	const { data, error } = await client.from('games_with_votes').select(
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
	);

	if (error) {
		throw error;
	}
	return data;
}
