import { SeoFactory } from '$lib/shared/seo/factory/base';
import type { MetaTagsProps } from 'svelte-meta-tags';
import type { Event } from 'schema-dts';
import type { default as eventsQuery } from '../../../../routes/events/query';
import { valueOrNothing } from '$lib/shared/shared/utils';
import type { default as eventQuery } from '../../../../routes/events/[slug]/query';

export class EventListSeoFactory extends SeoFactory {
	constructor(private readonly events: Awaited<ReturnType<typeof eventsQuery>>) {
		super();
	}

	protected metaTags(): MetaTagsProps {
		return {
			title: 'Events'
		};
	}

	protected jsonLd(): Event[] {
		const ld: Event[] = [];
		this.events.forEach((event) => {
			ld.push({
				'@type': 'Event',
				name: valueOrNothing(event.name),
				sameAs: 'https://www.sxya.org/events/' + event.slug,
				description: valueOrNothing(event.description),
				startDate: valueOrNothing(event.meeting_time),
				organizer: {
					'@type': 'Person',
					name: valueOrNothing(event.proposer?.first_name)
				}
			});
		});
		return ld;
	}
}

export class EventSeoFactory extends SeoFactory {
	constructor(private readonly event: Awaited<ReturnType<typeof eventQuery>>[number]) {
		super();
	}

	protected metaTags(): MetaTagsProps {
		return {
			title: valueOrNothing(this.event.name) + ' • Events'
		};
	}

	protected jsonLd(): Event {
		return {
			'@type': 'Event',
			name: valueOrNothing(this.event.name),
			description: valueOrNothing(this.event.description),
			startDate: valueOrNothing(this.event.meeting_time),
			endDate: valueOrNothing(this.event.inbound_time),
			location: valueOrNothing(this.event.event_point),
			organizer: {
				'@type': 'Person',
				name: valueOrNothing(this.event.proposer?.first_name)
			}
		};
	}
}
