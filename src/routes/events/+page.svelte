<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import { title } from '$lib/shared/shared/title';
	import { createQuery } from '@tanstack/svelte-query';
	import EventListItem from './EventListItem.svelte';
	import query from './query';
	import Callout from '$lib/shared/shared/components/callout/Callout.svelte';

	title.set('Events');

	const events = createQuery({
		queryKey: ['events'],
		queryFn: () => query()
	});
</script>

<HeroSection />

<section class="bg-neutral-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
	<div class="mx-auto max-w-7xl">
		<Callout class="mb-12">
			<p>
				Due to productivity constraints, event information is currently only available in Chinese
				(Hong Kong).
			</p>
		</Callout>

		<div class="grid grid-cols-1 space-y-16 lg:space-y-16">
			{#if $events.isSuccess}
				{#each $events.data as event}
					<EventListItem {event} />
				{/each}
			{/if}
		</div>
	</div>
</section>
