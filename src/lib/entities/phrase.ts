import { identifier, serializable } from 'serializr';

export class Phrase {
	@serializable(identifier())
	public readonly phrase: string;

	@serializable
	public readonly definition: string;

	constructor(phrase: string, definition: string) {
		this.phrase = phrase;
		this.definition = definition;
	}
}
