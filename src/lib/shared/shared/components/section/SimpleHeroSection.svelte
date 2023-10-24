<script lang="ts">
	let clazz: string | false | null = null;
	export { clazz as class };

	/**
	 * Sets the title of the section.
	 */
	export let title: string;

	/**
	 * Sets the tag line of the section.
	 */
	export let tagline: string | null = null;
</script>

<div class="bg-neutral-2 px-6 py-12 sm:py-20 lg:px-8 {clazz}">
	<div class="mx-auto max-w-2xl text-center">
		{#if tagline}
			<p class="text-base font-semibold leading-7 text-accent-11">
				{tagline}
			</p>
		{/if}
		<h2 class="text-4xl font-bold tracking-tight text-high-contrast sm:text-6xl">
			{title}
		</h2>
		<p class="mt-6 text-lg leading-8 text-low-contrast">
			<slot />
		</p>
	</div>
</div>
