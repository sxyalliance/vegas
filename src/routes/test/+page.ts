import type { PageLoad } from './$types';
import { constructDirectus } from '$lib/shared/directus/client';
import { readItems } from '@directus/sdk';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['events'],
		queryFn: () => constructDirectus(fetch).request(readItems('events'))
	});
};
