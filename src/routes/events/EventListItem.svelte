<script lang="ts">
	import Icon from '@iconify/svelte';
	import { kebabCase } from 'change-case';
	import dayjs from 'dayjs';

	import * as m from '$lib/shared/i18n/compiled/messages';

	import type query from './query';

	export let event: Awaited<ReturnType<typeof query>>[number];

	const meetingDay = dayjs(event.meeting_time);
	const today = dayjs();

	const category = event.category as NonNullable<typeof event.category>;
</script>

<a href={`/events/${event.id}/${event.slug}`}>
	<article
		class="relative isolate flex flex-col justify-between gap-10 bg-neutral-3 p-6 lg:flex-row"
	>
		<div class="flex-none">
			<div class="group relative mb-6 max-w-xl text-high-contrast">
				<span class="text-xl">
					{#if event.status === 'ongoing'}
						{m.event_status_ongoing_label()}
					{:else if event.status === 'finished'}
						{m.event_status_finished_label()}
					{:else}
						{m.event_status_upcoming_label()}
					{/if}
					Event
				</span>
				<h2 class="mt-1 text-2xl font-semibold leading-6">
					{m[`event_status_finished_label`]()}
					{meetingDay.fromNow()}
				</h2>
			</div>

			<div class="relative flex items-center justify-between gap-x-4 lg:absolute lg:bottom-4">
				<!-- Meeting Time (Bookmark effect) -->
				<div
					class="text-accent-fg relative -left-10 top-0 p-2 pl-2 pr-4 font-bold bg-{category.color}"
				>
					<div
						class="absolute left-0 top-17 border-8 border-b-transparent border-l-transparent border-{category.color}"
					/>
					<time class="sr-only" datetime={meetingDay.format()}>{meetingDay.format('l')}</time>
					<div class="flex" aria-hidden="true">
						<div class="mr-2 flex-shrink-0 self-center">
							<span class="text-3xl">{meetingDay.format('MM')}</span>
						</div>
						<div class="w-24">
							<h4 class="text-lg font-bold">
								{meetingDay.format('MMMM')}
							</h4>
							<span class="mt-1">{meetingDay.format('YYYY')}</span>
						</div>
					</div>
				</div>

				<!-- Entity Name & Proposer -->
				<div class="-ml-8">
					<span class="font-semibold text-high-contrast">
						{m.event_property_proposer()}
					</span>
					<p class="w-[12ch] truncate text-sm text-low-contrast">{event.proposer.nickname}</p>
				</div>
			</div>
		</div>

		<div class="mr-auto lg:flex lg:flex-col lg:place-content-center">
			<div class="text-5xl font-bold text-high-contrast">
				{event.name}
			</div>
			<p class="mt-2 line-clamp-3 text-low-contrast">
				{event.description}
			</p>
		</div>

		<div class="hidden flex-none lg:block">
			<div class="rounded-lg bg-neutralA-2 p-4">
				<Icon
					icon={`material-symbols:${kebabCase(String(category.icon))}`}
					class="h-full w-26 text-{category.color}"
				/>
			</div>
		</div>
	</article>
</a>
