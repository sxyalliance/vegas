import query, { queryCategories } from './query';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient, supabase } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['events'],
		queryFn: () => query(supabase)
	});

	await queryClient.prefetchQuery({
		queryKey: ['categories'],
		queryFn: () => queryCategories(supabase)
	});
};
