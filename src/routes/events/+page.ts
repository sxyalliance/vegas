import query, { queryCategories } from './query';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['events'],
		queryFn: () => query(fetch)
	});

	await queryClient.prefetchQuery({
		queryKey: ['categories'],
		queryFn: () => queryCategories(fetch)
	});
};
