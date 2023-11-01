import query from './query';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['phrases', 'random'],
		queryFn: () => query(fetch)
	});
};
