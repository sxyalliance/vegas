import type { SitemapParams } from 'sveltekit-sitemap';
import type { sitemap } from '../../../sitemap';

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
	// TODO: get routes from directus
	return {};
};
