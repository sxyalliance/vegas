import type { PageLoad } from './$types';
import query from './query';

export const load: PageLoad = async ({ params, parent }) => {
	const id = +params.id;

	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['event', id],
		queryFn: () => query(id, fetch)
	});

	return {
		id,
		slug: params.slug
	};
};
