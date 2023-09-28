import type { PostExtraPropertiesExtractor } from '$lib/notion/types';
import { makeNotNullable, mapPropertyToDate, mapPropertyToPrimitive } from '$lib/notion/utils';

export type EventExtraProperties = {
	id: string;
	relatedPersonnel: number;
	meetingTime: Date;
	meetingPoint: string;
	eventPoint: string;
	outboundTransport: string | null;
	outboundTime: Date | null;
	inboundTransport: string | null;
	inboundTime: Date | null;
	proposer: string;
};

export const extractor: PostExtraPropertiesExtractor<EventExtraProperties> = (post) => {
	return {
		id: makeNotNullable(mapPropertyToPrimitive(post.properties['活動編號'])),
		relatedPersonnel: parseInt(
			makeNotNullable(mapPropertyToPrimitive(post.properties['參與人數']))
		),
		meetingTime: makeNotNullable(mapPropertyToDate(post.properties['會合時間'])),
		meetingPoint: makeNotNullable(mapPropertyToPrimitive(post.properties['會合地點'])),
		eventPoint: makeNotNullable(mapPropertyToPrimitive(post.properties['活動地點'])),
		outboundTransport: mapPropertyToPrimitive(post.properties['去程載具']),
		outboundTime: mapPropertyToDate(post.properties['去程時間']),
		inboundTransport: mapPropertyToPrimitive(post.properties['回程載具']),
		inboundTime: mapPropertyToDate(post.properties['回程時間']),
		proposer: makeNotNullable(mapPropertyToPrimitive(post.properties['發起人']))
	};
};
