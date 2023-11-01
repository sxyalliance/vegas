import { readItems } from '@directus/sdk';

import { constructDirectus } from '$lib/shared/directus/client';

import type { sitemap } from '../../../sitemap';
import type { SitemapParams } from 'sveltekit-sitemap';

export const getRobots: SitemapParams<typeof sitemap>['getRobots'] = async () => {
	return {
		userAgent: '*',
		paths: {
			'/api/': false,
			'/apid/': false,
			'/test/': false,
			'/lab/': false
		}
	};
};

export const getRoutes: SitemapParams<typeof sitemap>['getRoutes'] = async () => {
	return {
		'/events/[id=integer]/[[slug]]': await getEventRoutes()
	};
};

const getEventRoutes = async () => {
	const events = constructDirectus().request(
		readItems('events', {
			fields: ['id', 'slug']
		})
	);

	return await events.then((res) => {
		return res.map((event) => {
			return {
				path: `/events/${event.id}/${event.slug}`
			};
		});
	});
};
