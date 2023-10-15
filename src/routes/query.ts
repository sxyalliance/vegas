import { constructDirectus } from '$lib/shared/directus/client';
import { readItems } from '@directus/sdk';

export default function query(customFetch = fetch) {
	return constructDirectus(customFetch).request(
		readItems('phrases', {
			fields: ['id', 'phrase', 'definition'],
			// pick random
			// we use tricky way because official do not support random
			// 67 items in total (2023-10-15)
			// pick 4 items
			offset: Math.floor(Math.random() * 67),
			limit: 4
		})
	);
}
