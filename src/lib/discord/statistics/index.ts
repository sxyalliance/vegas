export const getOnlineMemberCount = async () => {
	const res = await fetch('https://discord.com/api/guilds/567268233263185922/widget.json');
	const data = await res.json();
	return data.presence_count;
};
