<script lang="ts">
	import Card from '$lib/vgui/card/Card.svelte';

	import type { Hst } from '@histoire/plugin-svelte';

	// eslint-disable-next-line no-import-assign
	export let Hst: Hst;

	let variant: 'surface' | 'classic' = 'classic';
	let text = 'Hello World';
</script>

<Hst.Story>
	<Card {variant}>{text}</Card>

	<svelte:fragment slot="controls">
		<Hst.Text title="Text" bind:value={text} />
		<Hst.Select title="Variant" bind:value={variant} options={['surface', 'classic']} />
	</svelte:fragment>
</Hst.Story>
