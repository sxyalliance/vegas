import { error } from '@sveltejs/kit';

import { languageTag, sourceLanguageTag } from '$i18n/runtime';

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
	try {
		const html = await getRuleHtml(name, languageTag());
		return { html };
	} catch (err) {
		throw error(404, 'Not Found');
	}
};
