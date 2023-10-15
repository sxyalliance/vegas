import type { PageLoad } from './$types';
import query from './query';

export const load: PageLoad = async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['phrases', 'random'],
		queryFn: () => query(fetch)
	});
};
