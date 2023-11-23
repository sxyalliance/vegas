<script lang="ts">
	import Icon from '@iconify/svelte';

	import * as m from '$lib/shared/i18n/compiled/messages';
	import LocalePreferencesSection from '$lib/shared/layout/preferences/LocalePreferencesSection.svelte';
	import ThemePreferencesSection from '$lib/shared/layout/preferences/ThemePreferencesSection.svelte';
	import { Button } from '$lib/vgui/components/ui/button';
	import * as Sheet from '$lib/vgui/components/ui/sheet';

	export let side: 'right' | 'bottom';
	export let open: boolean;
</script>

<Sheet.Root bind:open>
	<Sheet.Content {side} class="space-y-4">
		<section>
			<Sheet.Header>
				<Sheet.Title>{m.locale_preferences()}</Sheet.Title>
			</Sheet.Header>

			<div class="py-4">
				<LocalePreferencesSection />
			</div>
		</section>

		<section>
			<Sheet.Header>
				<Sheet.Title>{m.theme_preferences()}</Sheet.Title>
			</Sheet.Header>

			<div class="py-4">
				<ThemePreferencesSection />
			</div>
		</section>
	</Sheet.Content>
</Sheet.Root>
