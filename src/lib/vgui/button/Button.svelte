<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { loadingAction } from 'svelte-legos';

	let clazz: string | false | null = null;
	export { clazz as class };

	/**
	 * Resizes the padding to make the button smaller or larger.
	 */
	export let size: 'small' | 'medium' | 'large' = 'medium';

	/**
	 * Gives the button a different look.
	 */
	export let variant: 'solid' | 'soft' | 'surface' | 'transparent' = 'solid';

	/**
	 * Turns the button into a link.
	 */
	export let href: string | null = null;

	/**
	 * Shows a loading indicator.
	 */
	export let loading: boolean = false;

	const dispatch = createEventDispatcher();
</script>

{#if href}
	<a
		class="btn {size} {variant} accent {clazz}"
		{href}
		on:click={(e) => dispatch('click', { nativeEvent: e })}
		use:loadingAction={loading}
		{...$$restProps}
	>
		<slot />
	</a>
{:else}
	<button
		type="button"
		class="btn {size} {variant} accent {clazz}"
		on:click={(e) => dispatch('click', { nativeEvent: e })}
		use:loadingAction={loading}
		{...$$restProps}
	>
		<slot />
	</button>
{/if}

<style lang="postcss">
	@import 'button.pcss';
</style>
