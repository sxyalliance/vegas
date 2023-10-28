import type { JsonLdProps, MetaTagsProps } from 'svelte-meta-tags';

export interface SeoDataProvider {
	getMetaTags(): MetaTagsProps;

	getJsonLd(): JsonLdProps['schema'];
}

export abstract class SeoFactory implements SeoDataProvider {
	protected abstract metaTags(): MetaTagsProps;

	protected abstract jsonLd(): JsonLdProps['schema'];

	public getMetaTags(): MetaTagsProps {
		return {
			titleTemplate: '%s • SXYA Community',
			title: 'SXYA Community',
			...this.metaTags()
		};
	}

	public getJsonLd(): JsonLdProps['schema'] {
		return this.jsonLd();
	}
}
