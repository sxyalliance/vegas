<script lang="ts">
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { getContext, setContext } from 'svelte';

	import {
		availableLanguageTags,
		setLanguageTag,
		onSetLanguageTag,
		sourceLanguageTag,
		languageTag
	} from '$i18n/runtime';

	// We check if the language tag is valid, if it is, we set it,
	// if not, we redirect to the same page without the language tag
	setContext(
		'languageTag',
		$page.params.lang
			? (availableLanguageTags as readonly string[]).includes($page.params.lang)
				? $page.params.lang
				: (() => {
						throw redirect(
							302,
							('/' + $page.url.href.split($page.params.lang)[1]).replace('//', '/')
						);
				  })()
			: sourceLanguageTag
	);

	setLanguageTag(() => getContext('languageTag'));

	// We save the old language tag to check if the language tag has changed
	let oldLanguageTag = languageTag();

	if (import.meta.env.SSR === false) {
		onSetLanguageTag((newLanguageTag) => {
			// If the language tag is the same as the current language tag, we don't want to do anything
			if (newLanguageTag === oldLanguageTag) return;

			// If we set the language tag to the source language tag, we want to remove the language tag from the url
			if (newLanguageTag === sourceLanguageTag) {
				// this returns the route without the language tag
				const route = window.location.href.match(/^https?:\/\/[^/]+\/[^/]*(\/.*)/);

				// Redirect to the same page with the new language
				window.location.href = route ? route[1] : '/';

				// renew the old language tag
				oldLanguageTag = newLanguageTag;

				// if we set the language tag from the source language tag, we want to add the language tag to the url
			} else if (oldLanguageTag === sourceLanguageTag) {
				// this simply returns the route, since we don't have to remove the language tag,
				// beacuse the preveous language was the source language.
				// It also does not matter if for some reason "en" language tag is still given, it removes it anyway.
				const route = window.location.href
					.replace(/^https?:\/\/[^/]+\/(en)(\/|$)/, '')
					.match(/^https?:\/\/[^/]+(\/.*)/);

				// Redirect to the same page with the new language
				window.location.href = route ? '/' + newLanguageTag + route[1] : '/' + newLanguageTag;

				// renew the old language tag
				oldLanguageTag = newLanguageTag;

				// if we change the language tag not from and not to the source language, we want to keep the url
			} else {
				// this returns the route without the language tag
				const route = window.location.href.match(/^https?:\/\/[^/]+\/[^/]*(\/.*)/);

				// Redirect to the same page with the new language
				window.location.href =
					route && route[1] ? '/' + newLanguageTag + route[1] : '/' + newLanguageTag;

				// renew the old language tag
				oldLanguageTag = newLanguageTag;
			}
		});
	}
</script>

<slot />
