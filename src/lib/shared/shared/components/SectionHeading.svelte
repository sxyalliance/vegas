<script lang="ts">
	export let title: string;
</script>

<div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-3xl">
	<h2 class="text-high-contrast text-3xl font-extrabold tracking-tight sm:text-4xl">
		{title}
	</h2>
	{#if $$slots.default}
		<p class="text-low-contrast text-xl">
			<slot />
		</p>
	{/if}
</div>
