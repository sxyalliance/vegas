<script lang="ts">
	let clazz: string | false | null = null;
	export { clazz as class };

	/**
	 * Gives the card a different look.
	 */
	export let variant: 'surface' | 'classic' | 'classic-slim' | 'pure' = 'classic';
</script>

<div class="card {variant} {clazz}" {...$$restProps}>
	<slot />
</div>

<style lang="postcss">
	@import 'card.pcss';
</style>
