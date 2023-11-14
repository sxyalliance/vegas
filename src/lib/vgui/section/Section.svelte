<script lang="ts">
	let clazz: string | false | null = null;
	export { clazz as class };

	/**
	 * Sets a different width for the content.
	 */
	export let width: 'xl' | '3xl' | '4xl' | '7xl' = '7xl';
</script>

<section class="px-6 py-12 sm:py-20 lg:px-8 {clazz}">
	<div class="mx-auto {`section-width-${width}`}">
		<slot />
	</div>
</section>

<style lang="postcss">
	.section-width-xl {
		@apply max-w-xl;
	}

	.section-width-3xl {
		@apply max-w-3xl;
	}

	.section-width-4xl {
		@apply max-w-4xl;
	}

	.section-width-7xl {
		@apply max-w-7xl;
	}
</style>
