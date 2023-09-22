import type { CategoryKey } from "$lib/api/event_category";

export interface CategoryInfo {
	key: CategoryKey;
	icon: string;
	color: string;
}

export interface Event {
	id: string;
	name: string;
	category: CategoryKey;
	relatedPersonnel: number;

	meetingTime: EventDateTime;
	meetingPoint: string;

	eventPoint: string;
	description: string;

	outboundTransport?: string;
	outboundTime: EventDateTime;
	inboundTransport?: string;
	inboundTime: EventDateTime;

	proposer: string;
}

type EventDateTime = ExactEventDateTime | ApproximateEventDateTime;

interface ExactEventDateTime {
	exact: true;
	date: Date;
}

interface ApproximateEventDateTime {
	exact: false;
	date: string;
}
