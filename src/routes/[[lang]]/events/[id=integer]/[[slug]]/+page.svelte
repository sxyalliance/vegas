<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';

	import { EventSeoFactory } from '$lib/shared/seo/factory/event';
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
	import { mEventCategoryName } from '$lib/shared/shared/i18n_utils';
	import Section from '$lib/vgui/section/Section.svelte';

	import EventProperties from './EventProperties.svelte';
	import query from './query';

	import type { PageData } from './$types';

	export let data: PageData;

	const event = createQuery({
		queryKey: ['event', data.id],
		queryFn: () => query(data.id, $page.data.supabase)
	});

	$: if ($event.isSuccess) {
		// change slug if it incorrect or not exists
		if (browser && data.slug !== $event.data.slug) {
			goto(`/events/${$event.data.id}/${$event.data.slug}`, { replaceState: true });
		}
	}
</script>

<Section width="3xl">
	{#if $event.isSuccess}
		<SeoHandler factory={new EventSeoFactory($event.data)} />

		<article class="text-base leading-7">
			<p class="text-base font-semibold leading-7 text-primary">
				{mEventCategoryName[$event.data.category_key]()}
				#{$event.data.id}
			</p>
			<h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
				{$event.data.name}
			</h1>
			<p class="my-4 text-xl leading-8 text-muted-foreground">
				{$event.data.description}
			</p>

			<EventProperties properties={$event.data} />
		</article>
	{/if}
</Section>
