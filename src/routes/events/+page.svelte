<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import EventListItem from './EventListItem.svelte';
	import query from './query';
	import Callout from '$lib/vgui/callout/Callout.svelte';
	import Section from '$lib/vgui/section/Section.svelte';
	import DataUnavailableCallout from '$lib/shared/shared/components/DataUnavailableCallout.svelte';
	import { _ } from '$lib/shared/i18n';
	import SeoHandler from '$lib/shared/shared/components/SeoHandler.svelte';

	const events = createQuery({
		queryKey: ['events'],
		queryFn: () => query()
	});
</script>

<SeoHandler
	metaTags={{
		title: 'Events',
		description: 'A list of all events that are currently available on the site.'
	}}
/>

<HeroSection />

<Section>
	<Callout class="mb-12">
		<p>{_('event_information_language_restriction')}</p>
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
