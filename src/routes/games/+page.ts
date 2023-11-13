import query from './query';

import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
	const { queryClient, supabase } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['games'],
		queryFn: () => query(supabase)
	});
}) satisfies PageLoad;
