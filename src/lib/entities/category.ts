import { identifier, serializable } from 'serializr';

export class Category {
	@serializable(identifier())
	public readonly key: string;

	@serializable
	public readonly icon: string;

	@serializable
	public readonly color: string;

	constructor(key: string, icon: string, color: string) {
		this.key = key;
		this.icon = icon;
		this.color = color;
	}
}
