<script lang="ts">
	import { localePreference } from '$lib/shared/i18n/index';
</script>

<!-- trigger a re-render if the language tag changes -->
{#key $localePreference}
	<slot />
{/key}
