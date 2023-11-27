<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import { createQuery } from '@tanstack/svelte-query';

	import * as m from '$i18n/messages';
	import { EventListSeoFactory } from '$lib/shared/seo/factory/event';
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
	import DataUnavailableCallout from '$lib/shared/shared/components/DataUnavailableCallout.svelte';
	import { Alert, AlertDescription } from '$lib/vgui/components/ui/alert';
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
	<Alert class="mb-12">
		<Icon icon="lucide:info" class="h-4 w-4" />
		<AlertDescription>{m.event_information_language_restriction()}</AlertDescription>
	</Alert>

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
