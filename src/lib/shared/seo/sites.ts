import { DOPPLER_ENVIRONMENT } from '$env/static/private';

import { definition } from '$lib/shared/layout/header/navigation';
import type { FlyoutNavItem } from '$lib/shared/layout/header/navigation/types';
import { createBrowserClient } from '$lib/shared/supabase/client';

import type { sitemap } from '../../../sitemap';
import type { SitemapParams } from 'sveltekit-sitemap';

export const getRobots: SitemapParams<typeof sitemap>['getRobots'] = async () => {
	// we dont want staging to be indexed
	if (DOPPLER_ENVIRONMENT === 'stg') {
		return {
			userAgent: '*',
			paths: {
				'/': false
			}
		};
	}

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
		'/events/[id=integer]/[[slug]]': await getEventRoutes(),
		'/rules/[name]': await getRuleRoutes()
	};
};

const getEventRoutes = async () => {
	const { data, error } = await createBrowserClient(fetch, null).from('events').select('id, slug');

	if (error) {
		throw error;
	}

	return data.map((event) => {
		return {
			path: `/events/${event.id}/${event.slug}`
		};
	});
};

const getRuleRoutes = async () => {
	const navigation = definition.find((nav) => nav.name === 'navigation_other');
	if (!navigation) {
		return [];
	}

	const rules = (navigation as FlyoutNavItem).flyout.items.filter(
		(item) => item.href?.startsWith('/rules')
	);

	return rules.map((rule) => {
		return {
			path: rule.href
		};
	});
};
