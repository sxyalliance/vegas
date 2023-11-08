<script lang="ts">
	import Section from '$lib/vgui/section/Section.svelte';

	let clazz: string | false | null = null;
	export { clazz as class };

	/**
	 * Uses an alternate background color.
	 */
	export let alternate: boolean = false;
</script>

<Section {alternate} class={clazz}>
	<article class="prose-here prose mx-auto">
		<slot />
	</article>
</Section>
