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

<div class="bg-muted px-6 py-12 sm:py-20 lg:px-8 {clazz}">
	<div class="mx-auto max-w-2xl text-center">
		{#if tagline}
			<p class="text-base font-semibold leading-7 text-primary">
				{tagline}
			</p>
		{/if}
		<h2 class="text-4xl font-bold tracking-tight sm:text-6xl">
			{title}
		</h2>
		<p class="mt-6 text-lg leading-8 text-muted-foreground">
			<slot />
		</p>
		{#if $$slots.cta}
			<div class="mt-8">
				<slot name="cta" />
			</div>
		{/if}
	</div>
</div>
