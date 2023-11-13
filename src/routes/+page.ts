import query from './query';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient, supabase } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['phrases', 'random'],
		queryFn: () => query(supabase)
	});
};
