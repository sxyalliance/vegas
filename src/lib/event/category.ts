export enum CategoryKey {
	DINING = 'dining',
	ENTERTAINMENT = 'entertainment',
	ACADEMIC = 'academic',
	SPORT = 'sport',
	GIVEAWAY = 'giveaway'
}

export interface Category {
	key: CategoryKey;
	icon: string;
	color: string;
}

const categories = new Map<CategoryKey, Category>([
	[
		CategoryKey.DINING,
		{
			key: CategoryKey.DINING,
			icon: 'tabler:cake',
			color: 'teal10'
		}
	],
	[
		CategoryKey.ENTERTAINMENT,
		{
			key: CategoryKey.ENTERTAINMENT,
			icon: 'tabler:music',
			color: 'pink10'
		}
	],
	[
		CategoryKey.ACADEMIC,
		{
			key: CategoryKey.ACADEMIC,
			icon: 'tabler:school',
			color: 'indigo10'
		}
	],
	[
		CategoryKey.SPORT,
		{
			key: CategoryKey.SPORT,
			icon: 'tabler:shirt-sport',
			color: 'amber10'
		}
	],
	[
		CategoryKey.GIVEAWAY,
		{
			key: CategoryKey.GIVEAWAY,
			icon: 'tabler:gift',
			color: 'ruby10'
		}
	]
]);

export function getCategoryByKey(key: CategoryKey): Category {
	return <Category>categories.get(key);
}
