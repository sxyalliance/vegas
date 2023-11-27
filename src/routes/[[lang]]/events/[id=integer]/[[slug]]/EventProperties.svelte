<script lang="ts">
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';

	import * as m from '$i18n/messages';
	import type { MessageId } from '$lib/shared/shared/i18n_utils';
	import { Badge } from '$lib/vgui/components/ui/badge';
	import { Card, CardTitle, CardHeader, CardContent } from '$lib/vgui/components/ui/card';

	import type query from './query';

	export let properties: Awaited<ReturnType<typeof query>>;

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
			icon: 'lucide:calendar-clock'
		},
		{
			type: 'text',
			label: 'event_property_meeting_point',
			text: properties.meeting_point,
			icon: 'lucide:map-pinned'
		},
		{
			type: 'text',
			label: 'event_property_event_point',
			text: properties.event_point,
			icon: 'lucide:map'
		},
		{
			type: 'text',
			label: 'event_property_proposer',
			text: proposer.nickname,
			icon: 'lucide:user-2'
		},
		{
			type: 'text',
			label: 'event_property_outbound_transport',
			text: properties.outbound_transport,
			icon: 'lucide:truck'
		},
		{
			type: 'datetime',
			label: 'event_property_outbound_time',
			datetime: properties.outbound_time,
			icon: 'lucide:clock'
		},
		{
			type: 'text',
			label: 'event_property_inbound_transport',
			text: properties.inbound_transport,
			icon: 'lucide:truck'
		},
		{
			type: 'datetime',
			label: 'event_property_inbound_time',
			datetime: properties.inbound_time,
			icon: 'lucide:clock'
		}
	];
</script>

<div class="lg:col-start-3 lg:row-end-1">
	<Card>
		<CardHeader>
			<CardTitle>Information</CardTitle>
		</CardHeader>

		<CardContent>
			<dl class="flex flex-wrap">
				<div id="properties-list" class="grid w-full grid-cols-1 gap-y-4 lg:grid-cols-2">
					<div class="flex w-full flex-none gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">{m.event_property_related_personnel()}</span>
							<Icon icon="lucide:users-2" class="text-neutral-10 h-6 w-6" />
						</dt>
						<dd class="text-sm font-medium leading-6">
							{properties.related_personnel}
						</dd>
					</div>

					<div class="flex w-full flex-none gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">{m.event_property_status()}</span>
							<Icon icon="lucide:stamp" class="text-neutral-10 h-6 w-6" />
						</dt>
						<dd class="text-sm font-medium leading-6">
							{#if properties.status === 'upcoming'}
								<Badge>{m.event_status_upcoming_label()}</Badge>
							{:else if properties.status === 'finished'}
								<Badge variant="destructive">{m.event_status_finished_label()}</Badge>
							{:else if properties.status === 'ongoing'}
								<Badge variant="secondary">{m.event_status_ongoing_label()}</Badge>
							{/if}
						</dd>
					</div>

					{#each list as property, i (property.label)}
						<div class="flex w-full flex-none gap-x-4">
							<dt class="flex-none">
								<span class="sr-only">{m[property.label]()}</span>
								<Icon icon={property.icon} class="h-6 w-6 {i > 1 && 'text-muted-foreground'}" />
							</dt>
							<dd class="text-sm font-medium leading-6 {i > 1 && 'text-muted-foreground'}">
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
		</CardContent>
	</Card>
</div>
