<script lang="ts">
	export let title: string;
</script>

<div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-3xl">
	<h2 class="text-3xl font-extrabold tracking-tight text-high-contrast sm:text-4xl">
		{title}
	</h2>
	{#if $$slots.default}
		<p class="text-xl text-low-contrast">
			<slot />
		</p>
	{/if}
</div>
