<script lang="ts">
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';

	import { _ } from '$lib/shared/i18n';
	import { EventListSeoFactory } from '$lib/shared/seo/factory/event';
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
	import DataUnavailableCallout from '$lib/shared/shared/components/DataUnavailableCallout.svelte';
	import Callout from '$lib/vgui/callout/Callout.svelte';

	import Section from '$lib/vgui/section/Section.svelte';

	import EventListItem from './EventListItem.svelte';
	import HeroSection from './HeroSection.svelte';
	import query from './query';

	const events = createQuery({
		queryKey: ['events'],
		queryFn: () => query($page.data.supabase)
	});
</script>

<HeroSection />

<Section>
	<Callout class="mb-12">
		<p>{_('event_information_language_restriction')}</p>
	</Callout>

	{#if $events.isSuccess}
		<SeoHandler factory={new EventListSeoFactory($events.data)} />

		<div class="grid grid-cols-1 space-y-16 lg:space-y-16">
			{#each $events.data as event}
				<EventListItem {event} />
			{/each}
		</div>
	{:else if $events.isError}
		<DataUnavailableCallout />
	{/if}
</Section>
