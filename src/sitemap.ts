import type { RO_Sitemap } from 'sveltekit-sitemap';

export const sitemap = (<const>{
	'/': true,
	'/about/faq': false,
	'/about/members': false,
	'/about': true,
	'/api': true,
	'/calendar/gaming': false,
	'/calendar': true,
	'/events': true,
	'/events/[slug]': false,
	'/lab/ai': false,
	'/lab': true,
	'/policies/privacy': false,
	'/policies': true
}) satisfies RO_Sitemap;

export type Sitemap = typeof sitemap;
