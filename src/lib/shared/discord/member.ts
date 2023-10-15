import discordMembers from '$lib/api/discord_members.json';

function getMembers() {
	const roles: Record<string, string> = {
		認證成員: 'Verified Member',
		正式成員: 'Official Member'
	};

	// filter members with avatar and role
	const members = discordMembers.filter((member) => {
		// no temporary members
		if (member.avatar === null) {
			return false;
		}

		// no shadow members
		if (member.roles.includes('影分身')) {
			return false;
		}

		// only verified and official members
		for (const role in roles) {
			if (member.roles.includes(role)) {
				return true;
			}
		}
	});
	// map members to people
	const people = members.map((member) => {
		// replace unrecognized avatar
		if (!member.avatar.startsWith('https://cdn.discordapp.com/avatars/')) {
			// https://cdn.discordapp.com/embed/avatars/{0..4}.png
			member.avatar =
				'https://cdn.discordapp.com/embed/avatars/' + Math.floor(Math.random() * 5) + '.png';
		} else {
			// remove the trailing .png if exists
			member.avatar = member.avatar.replace(/\.png$/, '');
		}

		let avatar;

		if (member.avatar.endsWith('.png')) {
			avatar = {
				img: {
					src: member.avatar,
					w: 128,
					h: 128
				}
			};
		} else {
			avatar = {
				img: {
					src: member.avatar + '.png',
					w: 128,
					h: 128
				},
				sources: {
					webp: [{ src: member.avatar + '.webp', w: 128 }],
					jpeg: [{ src: member.avatar + '.jpeg', w: 128 }]
				}
			};
		}

		return {
			id: member.id,
			name: member.nickname || member.username,
			username: member.username,
			role: roles[(member.roles as unknown as string[]).find((role) => roles[role]) as string],
			roles: member.roles as unknown as string[],
			avatar,
			joined_at: member.joined_at,
			extra: {
				roleCount: member.roles.length
			}
		};
	});
	// sort by name
	people.sort((a, b) => a.name.localeCompare(b.name));
	// sort with role and role count
	people.sort((a, b) => {
		if (a.role === b.role) {
			return b.extra.roleCount - a.extra.roleCount;
		}
		return a.role.localeCompare(b.role);
	});
	return people;
}

export const all = getMembers();

export const verified = getMembers().filter((member) => member.role === 'Verified Member');

export const official = getMembers().filter((member) => member.role === 'Official Member');

const cores = [
	'404975289945292800',
	'949627280316051516',
	'625986547778322438',
	'428865576916746241',
	'449542938469466133'
];

export const core = getMembers().filter((member) => cores.includes(member.id));

export const officialExcludingCore = official.filter((member) => !cores.includes(member.id));
