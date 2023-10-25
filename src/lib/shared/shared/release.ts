declare const __APPNAME__: string;
declare const __VERSION__: Version;

export type Version = {
	/**
	 * The tag of the current commit.
	 *
	 * @example 'v2.0.0' when the current commit exactly matches a tag
	 * @example 'v2.0.0-45-g052f4f0' when the current commit is 45 commits ahead of a tag
	 * @example '052f4f0' when the current commit is not tagged (or cannot be determined)
	 */
	tag: string | null;

	/**
	 * The hash of the current commit.
	 *
	 * @example '052f4f0'
	 */
	hash: string | null;

	/**
	 * The date of the current commit.
	 *
	 * @example '2023-10-25 18:52'
	 */
	date: string | null;
};

export class Release {
	public static readonly name: string = __APPNAME__;
	public static readonly version: Version = __VERSION__;

	public static versionForHumans(): string {
		return `${this.version.tag}.${this.version.hash} @ ${this.version.date}`;
	}

	public static versionIdentifier(): string {
		return this.version.tag || `unreleased-g${this.version.hash}`;
	}
}
