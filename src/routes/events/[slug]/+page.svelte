<script lang="ts">
	import EventProperties from './EventProperties.svelte';
	import { _ } from 'svelte-i18n';
	import Icon from '@iconify/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import query from './query';
	import type { PageData } from './$types';
	import type { CustomDirectusTypes } from '$lib/shared/directus/types';

	export let data: PageData;

	const events = createQuery({
		queryKey: ['event', data.slug],
		queryFn: () => query(data.slug)
	});

	const getCategory = (
		event: Awaited<ReturnType<typeof query>>[number]
	): NonNullable<Partial<CustomDirectusTypes['event_categories'][number]>> => {
		return event.category as NonNullable<typeof event.category>;
	};
</script>

<section class="bg-neutral-1 px-6 py-32 lg:px-8">
	{#if $events.isSuccess}
		{#each $events.data as event}
			<article class="mx-auto max-w-3xl text-base leading-7">
				<p class="text-base font-semibold leading-7 text-accent-11">
					{$_(`event.category.${getCategory(event).key}.name`)}
					#{event.id}
				</p>
				<h1 class="mt-2 text-3xl font-bold tracking-tight text-high-contrast sm:text-4xl">
					{event.name}
				</h1>
				<p class="my-4 text-xl leading-8 text-low-contrast">
					{event.description}
				</p>

				<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
					<div class="/*col-span-2*/ col-span-3 lg:order-last">
						<EventProperties properties={event} />
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
		{/each}
	{/if}
</section>
