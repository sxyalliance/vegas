import LogoLight from '$lib/assets/logo-light.png';
import { SeoFactory } from '$lib/shared/seo/factory/base';

import type { NGO } from 'schema-dts';
import type { MetaTagsProps } from 'svelte-meta-tags';

export class HomeSeoFactory extends SeoFactory {
	protected metaTags(): MetaTagsProps {
		return {
			title: 'Home',
			description:
				"If you're looking for conversation ideas, we could talk about hobbies, travel, current events, personal goals, pop culture, food, or career. Is there anything in particular that interests you?"
		};
	}

	protected jsonLd(): NGO {
		return {
			'@type': 'NGO',
			name: 'SXYA Community',
			url: 'https://www.sxya.org',
			logo: LogoLight,
			foundingDate: new Date('2019-04-15').toISOString(),
			slogan:
				'The truth of the sea, and let not found to lie down in front of my eyes, all things for me to explore.',
			areaServed: 'Hong Kong',
			numberOfEmployees: { '@type': 'QuantitativeValue', value: 5 }
		};
	}
}
