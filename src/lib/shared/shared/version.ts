export type Version = {
	tag: string;
	hash: string;
	date: string;
};

declare const __VERSION__: {
	tag: string;
	hash: string;
	date: string;
};

export const version: Version = {
	tag: JSON.parse(__VERSION__.tag),
	hash: JSON.parse(__VERSION__.hash),
	date: JSON.parse(__VERSION__.date)
};
