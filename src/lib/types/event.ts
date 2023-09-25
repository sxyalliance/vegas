export enum CategoryKey {
	DINING = 'dining',
	ENTERTAINMENT = 'entertainment',
	ACADEMIC = 'academic',
	SPORT = 'sport',
	GIVEAWAY = 'giveaway'
}

export type Event = {
	published: boolean;

	name: string;
	slug: string;
	description: string;
	category: CategoryKey;
	relatedPersonnel: number;

	meetingTime: Date;
	meetingPoint: string;

	eventPoint: string;

	outboundTransport?: string;
	outboundTime?: string;
	inboundTransport?: string;
	inboundTime?: string;

	proposer: string;
};

export interface Category {
	key: CategoryKey;
	icon: string;
	color: string;
}
