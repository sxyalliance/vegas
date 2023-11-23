<script lang="ts">
	import TextField from '$lib/vgui/textfield/TextField.svelte';

	import type { Hst } from '@histoire/plugin-svelte';

	// eslint-disable-next-line no-import-assign
	export let Hst: Hst;

	let value: string = '';
</script>

<Hst.Story>
	<Hst.Variant title="Overlapping Label">
		<div class="mt-4">
			<TextField bind:value placeholder="Enter your name here" name="name">
				<svelte:fragment slot="help">Some helpful text here</svelte:fragment>
			</TextField>
		</div>
	</Hst.Variant>
</Hst.Story>
