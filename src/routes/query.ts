import type { SupabaseBrowserClient } from '$lib/shared/supabase/client';

export default async function query(client: SupabaseBrowserClient) {
	const { data, error } = await client.rpc('get_random_phrases').limit(4);

	if (error) {
		throw error;
	}

	return data;
}
