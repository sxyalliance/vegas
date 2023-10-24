<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Button from '$lib/vgui/button/Button.svelte';

	// eslint-disable-next-line no-import-assign
	export let Hst: Hst;

	let size: 'small' | 'medium' | 'large' = 'medium';
	let text = 'Button';
	let hasHref = false;
	$: href = hasHref ? 'https://www.example.org' : null;
	let loading = false;

	const variants = ['solid', 'soft', 'surface'] as const;
</script>

<Hst.Story layout={{ type: 'grid' }}>
	{#each variants as variant}
		<Hst.Variant title={variant.charAt(0).toUpperCase() + variant.slice(1)}>
			<Button {variant} {size} {href}>{text}</Button>
		</Hst.Variant>
	{/each}

	<svelte:fragment slot="controls">
		<Hst.Text title="Text" bind:value={text} />
		<Hst.Select title="Size" bind:value={size} options={['small', 'medium', 'large']} />
		<Hst.Checkbox title="Has href (Turns button into link)" bind:value={hasHref} />
		<Hst.Checkbox title="Loading (Shows loading indicator)" bind:value={loading} />
	</svelte:fragment>
</Hst.Story>
