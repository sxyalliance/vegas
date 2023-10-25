export type Version = {
	tag: string | null;
	hash: string | null;
	date: string | null;
};

declare const __VERSION__: Version;

export const version: Version = __VERSION__;

export const versionString = version.tag
	? `rev ${version.tag}.${version.hash} @ ${version.date}`
	: `rev ${version.hash} @ ${version.date}`;

export const versionIdentifier = `@${version.tag || 'unreleased'}.${version.hash || ''}`;
