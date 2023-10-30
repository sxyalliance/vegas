<script lang="ts">
	import EventProperties from './EventProperties.svelte';
	import { _ } from '$lib/shared/i18n';
	import Icon from '@iconify/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import query from './query';
	import type { PageData } from './$types';
	import type { CustomDirectusTypes } from '$lib/shared/directus/types';
	import Section from '$lib/vgui/section/Section.svelte';
	import SeoHandler from '$lib/shared/seo/SeoHandler.svelte';
	import { EventSeoFactory } from '$lib/shared/seo/factory/event';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data: PageData;

	const event = createQuery({
		queryKey: ['event', data.id],
		queryFn: () => query(data.id)
	});

	const getCategory = (
		event: Awaited<ReturnType<typeof query>>
	): NonNullable<Partial<CustomDirectusTypes['event_categories'][number]>> => {
		return event.category as NonNullable<typeof event.category>;
	};

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
			<p class="text-base font-semibold leading-7 text-accent-11">
				{_(`event_category_${getCategory($event.data).key}_name`)}
				#{$event.data.id}
			</p>
			<h1 class="mt-2 text-3xl font-bold tracking-tight text-high-contrast sm:text-4xl">
				{$event.data.name}
			</h1>
			<p class="my-4 text-xl leading-8 text-low-contrast">
				{$event.data.description}
			</p>

			<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div class="/*col-span-2*/ col-span-3 lg:order-last">
					<EventProperties properties={$event.data} />
				</div>
			</div>

			<div class="relative my-6">
				<div class="absolute inset-0 flex items-center" aria-hidden="true">
					<div class="w-full border-t border-neutral-6" />
				</div>
				<div class="relative flex justify-center">
					<span class="bg-neutral-1 px-2 text-neutral-9">
						<Icon icon="tabler:lego" class="h-5 w-5" />
					</span>
				</div>
			</div>
		</article>
	{/if}
</Section>
