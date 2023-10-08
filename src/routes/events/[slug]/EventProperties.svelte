<script lang="ts">
	import Icon from '@iconify/svelte';
	import { _ } from 'svelte-i18n';
	import type { Event } from '$lib/event/event/entity';

	export let properties: Event;

	type Property =
		| {
				type: 'text';
				label: string;
				text: string | null;
				icon: string;
		  }
		| {
				type: 'datetime';
				label: string;
				datetime: Date | null;
				icon: string;
		  };

	const list: Property[] = [
		{
			type: 'datetime',
			label: 'meeting_time',
			datetime: properties.meetingTime,
			icon: 'tabler:calendar-time'
		},
		{
			type: 'text',
			label: 'meeting_point',
			text: properties.meetingPoint,
			icon: 'tabler:map-pin'
		},
		{
			type: 'text',
			label: 'event_point',
			text: properties.eventPoint,
			icon: 'tabler:map'
		},
		{
			type: 'text',
			label: 'proposer',
			text: properties.proposer.name,
			icon: 'tabler:user-edit'
		},
		{
			type: 'text',
			label: 'outbound_transport',
			text: properties.outboundTransport,
			icon: 'tabler:truck-delivery'
		},
		{
			type: 'datetime',
			label: 'outbound_time',
			datetime: properties.outboundTime,
			icon: 'tabler:clock-up'
		},
		{
			type: 'text',
			label: 'inbound_transport',
			text: properties.inboundTransport,
			icon: 'tabler:truck-return'
		},
		{
			type: 'datetime',
			label: 'inbound_time',
			datetime: properties.inboundTime,
			icon: 'tabler:clock-down'
		}
	];
</script>

<div class="lg:col-start-3 lg:row-end-1">
	<div class="panel">
		<dl class="flex flex-wrap">
			<div class="flex-auto">
				<dt class="text-sm font-semibold leading-6 text-hue12">
					{$_('event.property.related_personnel')}
				</dt>
				<dd class="mt-1 text-base font-semibold leading-6 text-hue12">
					{properties.relatedPersonnel}
				</dd>
			</div>
			<div class="flex-none self-end pt-4">
				<dt class="sr-only">
					{$_('event.property.status')}
				</dt>
				{#if properties.status === 'upcoming'}
					<dd class="badge-flat-teal">{$_('event.status.upcoming.label')}</dd>
				{:else if properties.status === 'finished'}
					<dd class="badge-flat-slate">{$_('event.status.finished.label')}</dd>
				{:else if properties.status === 'ongoing'}
					<dd class="badge-flat-amber">{$_('event.status.ongoing.label')}</dd>
				{/if}
			</div>
			<div
				id="properties-list"
				class="grid grid-cols-1 lg:grid-cols-2 gap-y-4 border-t pt-6 mt-6 w-full"
			>
				{#each list as property, i (property.label)}
					<div class="flex w-full flex-none gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">{$_(`event.property.${property.label}`)}</span>
							<Icon icon={property.icon} class="h-6 w-5 {i < 2 ? 'text-hue11' : 'text-hue10'}" />
						</dt>
						<dd class="text-sm font-medium leading-6 {i < 2 ? 'text-hue12' : 'text-hue11'}">
							{#if property.type === 'datetime'}
								{#if property.datetime}
									<time datetime={property.datetime.toISOString()}>
										{property.datetime.toLocaleDateString()}
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
	</div>
</div>
