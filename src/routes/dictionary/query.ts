import type { SupabaseBrowserClient } from '$lib/shared/supabase/client';

export default async function query(client: SupabaseBrowserClient) {
	const { data, error } = await client
		.from('phrases')
		.select(
			`
      phrase,
      definition,
      defined_at
      `
		)
		.order('defined_at', { ascending: false });

	if (error) {
		throw error;
	}

	return data;
}
