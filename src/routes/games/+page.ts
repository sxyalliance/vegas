import query from './query';

import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['games'],
		queryFn: () => query(fetch)
	});
}) satisfies PageLoad;
