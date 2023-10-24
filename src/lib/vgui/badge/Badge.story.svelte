<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Badge from '$lib/vgui/badge/Badge.svelte';

	// eslint-disable-next-line no-import-assign
	export let Hst: Hst;

	let size: 'small' | 'large' = 'small';
	let text = 'Badge';

	const variants = ['solid', 'soft', 'surface'] as const;
	const colors = ['accent', 'teal', 'slate', 'amber'] as const;
</script>

<Hst.Story layout={{ type: 'grid', width: 800 }}>
	{#each variants as variant}
		<Hst.Variant title={variant.charAt(0).toUpperCase() + variant.slice(1)}>
			<div class="flex gap-2">
				{#each colors as color}
					<Badge {variant} {color} {size}>{text}</Badge>
				{/each}
			</div>
		</Hst.Variant>
	{/each}

	<svelte:fragment slot="controls">
		<Hst.Text title="Text" bind:value={text} />
		<Hst.Select title="Size" bind:value={size} options={['small', 'large']} />
	</svelte:fragment>
</Hst.Story>
