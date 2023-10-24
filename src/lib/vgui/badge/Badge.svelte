<script lang="ts">
	let clazz: string | false | null = null;
	export { clazz as class };

	/**
	 * Resizes the padding to make the badge smaller or larger.
	 */
	export let size: 'small' | 'large' = 'small';

	/**
	 * Gives the badge a different look.
	 */
	export let variant: 'solid' | 'soft' | 'surface' = 'solid';

	/**
	 * Changes the color of the badge.
	 */
	export let color: 'accent' | 'teal' | 'slate' | 'amber' = 'accent';
</script>

<span class="badge {size} {variant} {color} {clazz}" {...$$restProps}>
	<slot />
</span>

<style lang="postcss">
	@import 'badge.pcss';
</style>
