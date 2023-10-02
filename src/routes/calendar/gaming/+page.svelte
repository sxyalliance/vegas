<script lang="ts">
	import type { PageData } from './$types';
	import {
		Availability,
		getAvailabilityOfTime,
		getDayOfWeek,
		getStatementStatsOfTime,
		getTimeOfDay,
		TimeOfDay
	} from '$lib/calendar/gaming';
	import SideBySideCalendar from './SideBySideCalendar.svelte';

	export let data: PageData;

	const date = new Date();
	const dayOfWeek = getDayOfWeek(date);
	const timeOfDay = getTimeOfDay(date);

	const availability = timeOfDay
		? getAvailabilityOfTime(data.gamingCalendar, dayOfWeek, timeOfDay)
		: Availability.NOT_FREE;
	const statementStats = timeOfDay
		? getStatementStatsOfTime(data.gamingCalendar, dayOfWeek, timeOfDay)
		: {};

	const timeOfDayLong = {
		[TimeOfDay.MORNING]: 'Morning',
		[TimeOfDay.AFTERNOON]: 'Afternoon',
		[TimeOfDay.EVENING]: 'Evening',
		[TimeOfDay.AFTER_DARK]: 'After Dark',
		null: 'Break'
	}[timeOfDay];

	const availabilityLong = {
		[Availability.AVAILABLE]: 'Available',
		[Availability.TENTATIVE]: 'Tentative',
		[Availability.NOT_FREE]: 'Not Free'
	}[availability];
</script>

<div class="bg-hue1 pt-36 pb-16 sm:pb-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-none mb-6">
			<div class="text-center">
				<h2 class="text-3xl font-bold tracking-tight text-hue12 sm:text-4xl">Gaming Time</h2>
				<p class="mt-4 text-lg leading-8 text-hue11 max-w-3xl mx-auto">
					This is a visual representation of the
					<a
						class="underline"
						target="_blank"
						href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTsOKB8runaSLRM6UpWCzYNHknFPW96TvPHbhwUjEXsvJQkY3urBF3CH_7VM6bweczxsVVrBKzPjTUG/pubhtml"
						>SXYA Weekly Availability Statement</a
					>, which helps gaming members better manage their own schedule by allowing them to verify
					the current gaming availability and potential play times this week.
				</p>
			</div>
			<dl
				class="mt-12 grid grid-cols-1 gap-0.5 overflow-hidden text-center sm:grid-cols-2 lg:grid-cols-4"
			>
				<div class="flex flex-col p-8">
					<dt class="text-sm font-semibold leading-6 text-hue11">Day of Week</dt>
					<dd class="order-first text-3xl font-semibold tracking-tight text-hue12">{dayOfWeek}</dd>
				</div>
				<div class="flex flex-col p-8">
					<dt class="text-sm font-semibold leading-6 text-hue11">Time of Day</dt>
					<dd class="order-first text-3xl font-semibold tracking-tight text-hue12">
						{timeOfDayLong}
					</dd>
				</div>
				<div class="flex flex-col p-8">
					<dt class="text-sm font-semibold leading-6 text-hue11">Overall Availability</dt>
					<dd
						class="order-first text-3xl font-semibold tracking-tight text-hue12"
						class:text-success10={availability === Availability.AVAILABLE}
						class:text-warning10={availability === Availability.TENTATIVE}
						class:text-error10={availability === Availability.NOT_FREE}
					>
						{timeOfDay ? availability + ' ' + availabilityLong : 'N/A'}
					</dd>
				</div>
				<div class="flex flex-col p-8">
					<dt class="text-sm font-semibold leading-6 text-hue11">Statements</dt>
					<dd class="order-first text-3xl font-semibold tracking-tight text-hue12">
						{#if timeOfDay}
							<span class="text-success10">{statementStats[Availability.AVAILABLE]}</span>
							|
							<span class="text-warning10">{statementStats[Availability.TENTATIVE]}</span>
							|
							<span class="text-error10">{statementStats[Availability.NOT_FREE]}</span>
						{:else}
							N/A
						{/if}
					</dd>
				</div>
			</dl>
		</div>

		<div
			class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"
		>
			<div class="rounded-md shadow-2xl ring-1 ring-gray-900/10 p-6">
				<SideBySideCalendar calendar={data.gamingCalendar} />
			</div>
		</div>
	</div>
</div>

<div class="bg-hue2">
	<div class="px-6 py-12 sm:px-6 sm:py-16 lg:px-8">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight text-hue12 sm:text-4xl">
				Don't want to miss any games?<br />
				Subscribe to gaming notifications.
			</h2>
			<p class="mx-auto mt-2 max-w-xl text-lg leading-8 text-hue11">
				Be notified when we are about to start playing.
			</p>
			<div class="mt-4 flex items-center justify-center">
				<a href="javascript:" class="btn-xl btn-primary">Coming Soon</a>
			</div>
		</div>
	</div>
</div>
