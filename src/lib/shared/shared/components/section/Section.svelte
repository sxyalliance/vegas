<script lang="ts">
	let clazz: string | false | null = null;
	export { clazz as class };

	/**
	 * Uses an alternate background color.
	 */
	export let alternate: boolean = false;

	/**
	 * Sets a different width for the content.
	 */
	export let width: 'xl' | '7xl' = '7xl';
</script>

<section
	class="px-6 py-12 sm:py-20 lg:px-8 {clazz}"
	class:bg-neutral-1={!alternate}
	class:bg-neutral-2={alternate}
>
	<div class="mx-auto {`section-width-${width}`}">
		<slot />
	</div>
</section>

<style lang="postcss">
	.section-width-xl {
		@apply max-w-xl;
	}

	.section-width-7xl {
		@apply max-w-7xl;
	}
</style>
