import rawEvents from './events.json';
import type { Event } from '../types/event';

function transformEvent(raw: any): Event {
	return {
		id: raw.id,
		name: raw.name,
		category: raw.category,
		relatedPersonnel: raw.relatedPersonnel,
		meetingTime: {
			exact: raw.meetingTime.exact,
			date: raw.meetingTime.exact ? new Date(raw.meetingTime.date) : raw.meetingTime.date
		},
		meetingPoint: raw.meetingPoint,
		eventPoint: raw.eventPoint,
		outboundTransport: raw.outboundTransport,
		outboundTime: {
			exact: raw.outboundTime.exact,
			date: raw.outboundTime.exact ? new Date(raw.outboundTime.date) : raw.outboundTime.date
		},
		inboundTime: {
			exact: raw.inboundTime.exact,
			date: raw.inboundTime.exact ? new Date(raw.inboundTime.date) : raw.inboundTime.date
		},
		inboundTransport: raw.inboundTransport,
		description: raw.description,
		proposer: raw.proposer
	};
}

export const events: Event[] = rawEvents.map(transformEvent);
