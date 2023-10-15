import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import query from './query';

export const load: PageLoad = async ({ params, parent }) => {
	const slug = params.slug;
	if (!slug) {
		throw error(404, 'Not found');
	}

	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['event', slug],
		queryFn: () => query(slug, fetch)
	});

	return {
		slug
	};
};
