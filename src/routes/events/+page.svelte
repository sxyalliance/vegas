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

<section class="bg-hue1 px-4 py-12 lg:px-8 lg:py-24 sm:px-6">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 space-y-16 lg:space-y-16">
			{#each events as event (event.slug)}
				{@const meetingDay = dayjs(event.meetingTime)}
				{@const today = dayjs()}
				<a href={`/events/${event.slug}`}>
					<article
						class="p-6 relative isolate flex flex-col lg:flex-row gap-10 justify-between bg-hue3"
					>
						<div class="flex-none">
							<div class="group relative max-w-xl text-hue12 mb-6">
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
								class="relative lg:(absolute bottom-4) flex items-center gap-x-4 justify-between"
							>
								<!-- Meeting Time (Bookmark effect) -->
								<div
									class="relative top-0 -left-10 p-2 pl-2 pr-4 font-bold text-primary-fg bg-{event
										.category.color}"
								>
									<div
										class="absolute top-17 left-0 border-8 border-l-transparent border-b-transparent border-{event
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
									<span class="font-semibold text-hue12">
										{$_('event.property.proposer')}
									</span>
									<p class="text-hue11 text-sm truncate w-[12ch]">{event.proposer.name}</p>
								</div>
							</div>
						</div>

						<div class="mr-auto lg:(flex flex-col place-content-center)">
							<div class="text-5xl font-bold text-hue12">
								{event.title}
							</div>
							<p class="line-clamp-3 text-hue11 mt-2">
								{event.description}
							</p>
						</div>

						<div class="flex-none hidden lg:block">
							<div class="p-4 bg-hue4 rounded-lg">
								<Icon icon={event.category.icon} class="h-full w-26 text-{event.category.color}" />
							</div>
						</div>
					</article>
				</a>
			{/each}
		</div>
	</div>
</section>
