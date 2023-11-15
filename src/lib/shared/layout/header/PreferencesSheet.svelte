<script lang="ts">
	import Icon from '@iconify/svelte';

	import * as m from '$lib/shared/i18n/compiled/messages';
	import ThemeSwitch from '$lib/shared/theme/ThemeSwitch.svelte';
	import { Button } from '$lib/vgui/components/ui/button';
	import * as Sheet from '$lib/vgui/components/ui/sheet';
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon">
			<Icon icon="lucide:settings-2" class="h-5 w-5" />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>{m.theme_preferences()}</Sheet.Title>
		</Sheet.Header>

		<div class="py-4">
			<ThemeSwitch />
		</div>
	</Sheet.Content>
</Sheet.Root>
