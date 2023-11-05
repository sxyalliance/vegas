import { readItems } from '@directus/sdk';

import { constructDirectus } from '$lib/shared/directus/client';

export default function query(customFetch = fetch) {
	return constructDirectus(customFetch).request(
		readItems('games', {
			fields: [
				'id',
				'provider',
				'provider_identifier',
				'name',
				'image_url',
				'formatted_price',
				'description'
			]
		})
	);
}
