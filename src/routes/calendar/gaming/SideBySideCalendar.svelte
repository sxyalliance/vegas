<script lang="ts">
	import dayjs from 'dayjs';
	import Icon from '@iconify/svelte';
	import type { GamingCalendar } from './calendar';
	import { Availability, getAvailabilityOfTime, getDayOfWeek, TimeOfDay } from './calendar';

	export let calendar: GamingCalendar;

	let selected = new Date();
	const today = dayjs();
	$: days = getDaysForCalendarMonth(today).map((date) => {
		const day = dayjs(date);
		return {
			date: day.toDate(),
			isToday: day.isSame(today, 'date'),
			isCurrentPeriod: day.isSame(today, 'week'),
			isSelected: day.isSame(selected, 'date')
		};
	});

	function getDaysForCalendarMonth(date) {
		const firstDayOfMonth = dayjs(date).startOf('month');
		const firstDayOfCal = firstDayOfMonth.clone().startOf('week');
		const lastDayOfMonth = firstDayOfMonth.clone().endOf('month');
		const lastDayOfCal = lastDayOfMonth.clone().endOf('week');
		let temp = firstDayOfCal.clone();
		const days = [temp.toDate()];
		while (temp.isBefore(lastDayOfCal) && days.length < 42) {
			temp = temp.add(1, 'day');
			days.push(temp.toDate());
		}
		while (days.length < 42) {
			temp = temp.add(1, 'day');
			days.push(temp.toDate());
		}
		return days;
	}

	const availabilityLongMap = {
		[Availability.AVAILABLE]: 'Available',
		[Availability.TENTATIVE]: 'Tentative',
		[Availability.NOT_FREE]: 'Not Free'
	};

	function getDetailsOfDay(date: Date) {
		const day = getDayOfWeek(date);

		return [
			{
				icon: 'meteocons:time-late-morning',
				period: 'Morning',
				availability: getAvailabilityOfTime(calendar, day, TimeOfDay.MORNING)
			},
			{
				icon: 'meteocons:time-afternoon',
				period: 'Afternoon',
				availability: getAvailabilityOfTime(calendar, day, TimeOfDay.AFTERNOON)
			},
			{
				icon: 'meteocons:time-evening',
				period: 'Evening',
				availability: getAvailabilityOfTime(calendar, day, TimeOfDay.EVENING)
			},
			{
				icon: 'meteocons:time-late-evening',
				period: 'After Dark',
				availability: getAvailabilityOfTime(calendar, day, TimeOfDay.AFTER_DARK)
			}
		];
	}

	$: details = getDetailsOfDay(selected);
</script>

<div class="md:grid md:grid-cols-2 md:divide-x md:divide-neutral-6">
	<div class="md:pr-14">
		<div class="flex items-center">
			<h2 class="flex-auto text-sm font-semibold text-high-contrast">January 2022</h2>
		</div>
		<div class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-low-contrast">
			<div>S</div>
			<div>M</div>
			<div>T</div>
			<div>W</div>
			<div>T</div>
			<div>F</div>
			<div>S</div>
		</div>
		<div class="mt-2 grid grid-cols-7 text-sm">
			{#each days as day, dayIdx (day.date)}
				<div class="py-2 {dayIdx > 6 ? 'border-t border-neutral-6' : ''}">
					<button
						type="button"
						on:click={() => (selected = day.date)}
						disabled={!day.isCurrentPeriod}
						class:text-hue1={day.isSelected && day.isToday}
						class:ring-2={day.isSelected}
						class:ring-inset={day.isSelected}
						class:ring-primary10={day.isSelected}
						class:text-primary10={!day.isSelected && day.isToday}
						class:text-hue12={!day.isToday}
						class:bg-primary10={day.isSelected && day.isToday}
						class:hover:bg-hue3={!day.isSelected}
						class:font-semibold={day.isSelected || day.isToday}
						class="mx-auto flex h-8 w-8 items-center justify-center rounded-full disabled:text-low-contrast"
					>
						<time datetime={day.date}>{day.date.getDate()}</time>
					</button>
				</div>
			{/each}
		</div>
	</div>
	<section class="mt-12 md:mt-0 md:pl-14">
		<h2 class="text-hue12 text-base font-semibold leading-6">
			Availability for
			<time datetime={selected}>{selected.toLocaleDateString()}</time>
		</h2>
		<ol class="text-hue10 mt-4 space-y-1 text-sm leading-6">
			{#each details as detail}
				<li
					class="focus-within:bg-hue2 hover:bg-hue1 group flex items-center space-x-4 rounded-xl p-2"
				>
					<Icon icon={detail.icon} class="h-15 w-15 -m-2 -mt-4 flex-none" />
					<div class="flex-auto">
						<p class="text-hue12">{detail.period}</p>
						<p class="mt-0.5">
							{detail.availability}
							{availabilityLongMap[detail.availability]}
						</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>
</div>
