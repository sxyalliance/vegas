import { date, serializable } from 'serializr';

export class Member {
	@serializable
	public readonly name: string;

	@serializable
	public readonly residence: string | null;

	@serializable(date())
	public readonly membershipDate: Date | null;

	@serializable
	public readonly email: string | null;

	@serializable
	public readonly phone: string | null;

	constructor(
		name: string,
		residence: string | null,
		membershipDate: Date | null,
		email: string | null,
		phone: string | null
	) {
		this.name = name;
		this.residence = residence;
		this.membershipDate = membershipDate;
		this.email = email;
		this.phone = phone;
	}
}
