<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _, MessageId } from '$lib/shared/i18n';
	import Badge from '$lib/shared/shared/components/badge/Badge.svelte';
	import Card from '$lib/shared/shared/components/card/Card.svelte';
	import type query from './query';
	import dayjs from 'dayjs';

	export let properties: Awaited<ReturnType<typeof query>>[number];

	type Property =
		| {
				type: 'text';
				label: MessageId;
				text?: string | null;
				icon: string;
		  }
		| {
				type: 'datetime';
				label: MessageId;
				datetime?: string | null;
				icon: string;
		  };

	const proposer = properties.proposer as NonNullable<typeof properties.proposer>;

	const list: Property[] = [
		{
			type: 'datetime',
			label: 'event_property_meeting_time',
			datetime: properties.meeting_time,
			icon: 'tabler:calendar-time'
		},
		{
			type: 'text',
			label: 'event_property_meeting_point',
			text: properties.meeting_point,
			icon: 'tabler:map-pin'
		},
		{
			type: 'text',
			label: 'event_property_event_point',
			text: properties.event_point,
			icon: 'tabler:map'
		},
		{
			type: 'text',
			label: 'event_property_proposer',
			text: proposer.first_name,
			icon: 'tabler:user-edit'
		},
		{
			type: 'text',
			label: 'event_property_outbound_transport',
			text: properties.outbound_transport,
			icon: 'tabler:truck-delivery'
		},
		{
			type: 'datetime',
			label: 'event_property_outbound_time',
			datetime: properties.outbound_time,
			icon: 'tabler:clock-up'
		},
		{
			type: 'text',
			label: 'event_property_inbound_transport',
			text: properties.inbound_transport,
			icon: 'tabler:truck-return'
		},
		{
			type: 'datetime',
			label: 'event_property_inbound_time',
			datetime: properties.inbound_time,
			icon: 'tabler:clock-down'
		}
	];
</script>

<div class="lg:col-start-3 lg:row-end-1">
	<Card class="">
		<dl class="flex flex-wrap">
			<div class="flex-auto">
				<dt class="text-sm font-semibold leading-6 text-high-contrast">
					{_('event_property_related_personnel')}
				</dt>
				<dd class="mt-1 text-base font-semibold leading-6 text-high-contrast">
					{properties.related_personnel}
				</dd>
			</div>
			<div class="flex-none self-end pt-4">
				<dt class="sr-only">
					{_('event_property_status')}
				</dt>
				{#if properties.status === 'upcoming'}
					<dd>
						<Badge color="teal" variant="soft">{_('event_status_upcoming_label')}</Badge>
					</dd>
				{:else if properties.status === 'finished'}
					<dd>
						<Badge color="slate" variant="soft">{_('event_status_finished_label')}</Badge>
					</dd>
				{:else if properties.status === 'ongoing'}
					<dd>
						<Badge color="amber" variant="soft">{_('event_status_ongoing_label')}</Badge>
					</dd>
				{/if}
			</div>
			<div
				id="properties-list"
				class="mt-6 grid w-full grid-cols-1 gap-y-4 border-t border-neutral-6 pt-6 lg:grid-cols-2"
			>
				{#each list as property, i (property.label)}
					<div class="flex w-full flex-none gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">{_(property.label)}</span>
							<Icon
								icon={property.icon}
								class="h-6 w-5 {i < 2 ? 'text-neutral-10' : 'text-neutral-9'}"
							/>
						</dt>
						<dd
							class="text-sm font-medium leading-6 {i < 2
								? 'text-high-contrast'
								: 'text-low-contrast'}"
						>
							{#if property.type === 'datetime'}
								{#if property.datetime}
									{@const day = dayjs(property.datetime)}
									<time datetime={day.format()}>
										{day.format('l')}
									</time>
								{:else}
									N/A
								{/if}
							{:else}
								{property.text ?? 'N/A'}
							{/if}
						</dd>
					</div>
				{/each}
			</div>
		</dl>
	</Card>
</div>
