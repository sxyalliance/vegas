<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import { title } from '$lib/shared/shared/title';
	import { createQuery } from '@tanstack/svelte-query';
	import EventListItem from './EventListItem.svelte';
	import query from './query';
	import Callout from '$lib/vgui/callout/Callout.svelte';
	import Section from '$lib/vgui/section/Section.svelte';
	import DataUnavailableCallout from '$lib/shared/shared/components/DataUnavailableCallout.svelte';
	import { _ } from '$lib/shared/i18n';

	title.set('Events');

	const events = createQuery({
		queryKey: ['events'],
		queryFn: () => query()
	});
</script>

<HeroSection />

<Section>
	<Callout class="mb-12">
		<p>{_('information_language_restriction')}</p>
	</Callout>

	{#if $events.isSuccess}
		<div class="grid grid-cols-1 space-y-16 lg:space-y-16">
			{#each $events.data as event}
				<EventListItem {event} />
			{/each}
		</div>
	{:else if $events.isError}
		<DataUnavailableCallout />
	{/if}
</Section>
