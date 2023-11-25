import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

import { localePreference } from '$lib/shared/i18n';
import { sourceLanguageTag } from '$lib/shared/i18n/compiled/runtime';

import type { PageLoad } from './$types';

const rules = import.meta.glob<{ html: string }>('./rule-*.md');

const getRuleHtml = async (name: string, locale: string): Promise<string> => {
	try {
		const { html } = await rules[`./rule-${name}-${locale}.md`]();
		return html;
	} catch (err) {
		if (locale !== sourceLanguageTag) {
			return getRuleHtml(name, sourceLanguageTag);
		}
		throw err;
	}
};

export const load: PageLoad = async ({ params }) => {
	const name = params.name;
	const locale = get(localePreference);
	try {
		const html = await getRuleHtml(name, locale);
		return { html };
	} catch (err) {
		throw error(404, 'Not Found');
	}
};
