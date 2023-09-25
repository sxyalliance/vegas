export type PostProperties = {
	title: string;
	slug: string;
	description: string;
	category: string;
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

export const placeholderDoNotUse = 1;
