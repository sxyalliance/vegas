import type { CategoryKey } from '$lib/event';
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { date, identifier, serializable } from 'serializr';

export class Event {
	public blocks: BlockObjectResponse[] = [];

	@serializable(identifier())
	public readonly id: string;

	@serializable
	public readonly title: string;

	@serializable
	public readonly slug: string;

	@serializable
	public readonly description: string;

	@serializable
	public readonly category: CategoryKey;

	@serializable
	public readonly relatedPersonnel: number;

	@serializable(date())
	public readonly meetingTime: Date;

	@serializable
	public readonly meetingPoint: string;

	@serializable
	public readonly eventPoint: string;

	@serializable
	public readonly outboundTransport: string | null;

	@serializable(date())
	public readonly outboundTime: Date | null;

	@serializable
	public readonly inboundTransport: string | null;

	@serializable(date())
	public readonly inboundTime: Date | null;

	@serializable
	public readonly proposer: string;

	constructor(
		id: string,
		title: string,
		slug: string,
		description: string,
		category: CategoryKey,
		relatedPersonnel: number,
		meetingTime: Date,
		meetingPoint: string,
		eventPoint: string,
		outboundTransport: string | null,
		outboundTime: Date | null,
		inboundTransport: string | null,
		inboundTime: Date | null,
		proposer: string
	) {
		this.id = id;
		this.title = title;
		this.slug = slug;
		this.description = description;
		this.category = category;
		this.relatedPersonnel = relatedPersonnel;
		this.meetingTime = meetingTime;
		this.meetingPoint = meetingPoint;
		this.eventPoint = eventPoint;
		this.outboundTransport = outboundTransport;
		this.outboundTime = outboundTime;
		this.inboundTransport = inboundTransport;
		this.inboundTime = inboundTime;
		this.proposer = proposer;
	}

	get status(): 'upcoming' | 'ongoing' | 'finished' {
		return 'upcoming';
	}
}
