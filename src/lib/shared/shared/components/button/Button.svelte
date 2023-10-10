<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let clazz: string | false | null = null;
	export { clazz as class };

	/**
	 * Resizes the padding to make the button smaller or larger.
	 */
	export let size: 'small' | 'medium' | 'large' = 'medium';

	/**
	 * Gives the button a different look.
	 */
	export let variant: 'solid' | 'soft' | 'surface' = 'solid';

	/**
	 * Turns the button into a link.
	 */
	export let href: string | null = null;

	const dispatch = createEventDispatcher();
</script>

{#if href}
	<a
		class="btn {size} {variant} accent {clazz}"
		{href}
		on:click={(e) => dispatch('click', { nativeEvent: e })}
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button
		type="button"
		class="btn {size} {variant} accent {clazz}"
		on:click={(e) => dispatch('click', { nativeEvent: e })}
		{...$$restProps}
	>
		<slot />
	</button>
{/if}

<style lang="postcss">
	@import './button.pcss';
</style>
