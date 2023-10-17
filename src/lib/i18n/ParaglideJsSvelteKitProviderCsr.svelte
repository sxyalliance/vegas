<script lang="ts">
	import { onSetLanguageTag, languageTag } from '@inlang/paraglide-js/vegas';

	// initialize a reactive language tag
	$: _languageTag = languageTag();

	// the server should not listen for language tag changes
	if (import.meta.env.SSR === false) {
		onSetLanguageTag((newLanguageTag) => {
			// set the reactive language tag
			_languageTag = newLanguageTag;
		});
	}
</script>

<!-- trigger a re-render if the language tag changes -->
{#key _languageTag}
	<slot />
{/key}
