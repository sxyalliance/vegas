<script lang="ts">
	import HeroSection from './HeroSection.svelte';
	import { title } from '$lib/shared/shared/title';
	import type { PageData } from './$types';
	import { _ } from 'svelte-i18n';
	import dayjs from 'dayjs';
	import Icon from '@iconify/svelte';
	import { deserialize } from 'serializr';
	import { Event } from '$lib/event/event/entity';

	export let data: PageData;

	title.set('Events');

	const events: Event[] = deserialize(Event, data.events);
</script>

<HeroSection />

<section class="bg-neutral-1 px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 space-y-16 lg:space-y-16">
			{#each events as event (event.slug)}
				{@const meetingDay = dayjs(event.meetingTime)}
				{@const today = dayjs()}
				<a href={`/events/${event.slug}`}>
					<article
						class="relative isolate flex flex-col justify-between gap-10 bg-neutral-3 p-6 lg:flex-row"
					>
						<div class="flex-none">
							<div class="group relative mb-6 max-w-xl text-high-contrast">
								<span class="text-xl">
									{#if meetingDay.isSame(today, 'day')}
										{$_('event.status.ongoing.label')}
									{:else if meetingDay.isBefore(today, 'day')}
										{$_('event.status.finished.label')}
									{:else}
										{$_('event.status.upcoming.label')}
									{/if}
									Event
								</span>
								<h2 class="mt-1 text-2xl font-semibold leading-6">
									{$_(`event.status.${event.status}.label`)}
									{meetingDay.fromNow()}
								</h2>
							</div>

							<div
								class="relative flex items-center justify-between gap-x-4 lg:absolute lg:bottom-4"
							>
								<!-- Meeting Time (Bookmark effect) -->
								<div
									class="text-accent-fg relative -left-10 top-0 p-2 pl-2 pr-4 font-bold bg-{event
										.category.color}"
								>
									<div
										class="absolute left-0 top-17 border-8 border-b-transparent border-l-transparent border-{event
											.category.color}"
									/>
									<time class="sr-only" datetime={event.meetingTime.toISOString()}>
										>{event.meetingTime.toLocaleDateString()}</time
									>
									<div class="flex" aria-hidden="true">
										<div class="mr-2 flex-shrink-0 self-center">
											<span class="text-3xl"
												>{event.meetingTime.getDate().toString().padStart(2, '0')}</span
											>
										</div>
										<div class="w-23">
											<h4 class="text-lg font-bold">
												{event.meetingTime.toLocaleString('en-US', { month: 'long' })}
											</h4>
											<span class="mt-1">{event.meetingTime.getFullYear()}</span>
										</div>
									</div>
								</div>

								<!-- Entity Name & Proposer -->
								<div class="-ml-8">
									<span class="font-semibold text-high-contrast">
										{$_('event.property.proposer')}
									</span>
									<p class="w-[12ch] truncate text-sm text-low-contrast">{event.proposer.name}</p>
								</div>
							</div>
						</div>

						<div class="mr-auto lg:flex lg:flex-col lg:place-content-center">
							<div class="text-5xl font-bold text-high-contrast">
								{event.title}
							</div>
							<p class="mt-2 line-clamp-3 text-low-contrast">
								{event.description}
							</p>
						</div>

						<div class="hidden flex-none lg:block">
							<div class="rounded-lg bg-neutralA-2 p-4">
								<Icon icon={event.category.icon} class="h-full w-26 text-{event.category.color}" />
							</div>
						</div>
					</article>
				</a>
			{/each}
		</div>
	</div>
</section>
