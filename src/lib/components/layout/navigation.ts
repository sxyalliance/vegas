export const navigation: NavigationDefinition = [
	{
		name: 'navigation.home',
		type: 'pure',
		href: '/'
	},
	{
		name: 'navigation.about',
		type: 'flyout',
		flyout: {
			rich: false,
			items: [
				{
					name: 'navigation.members',
					href: '/members'
				},
				{
					name: 'navigation.chronicle',
					href: '/about/chronicle'
				}
			]
		}
	},
	{
		name: 'navigation.resources',
		type: 'flyout',
		flyout: {
			rich: false,
			items: [
				{
					name: 'navigation.dictionary',
					href: '/dictionary'
				},
				{
					name: 'navigation.events',
					href: '/events'
				},
				{
					name: 'navigation.calendar',
					href: '/calendar/gaming'
				}
			]
		}
	},
	{
		name: 'navigation.other',
		type: 'flyout',
		flyout: {
			rich: true,
			items: [
				{
					name: 'navigation.universal_rules',
					href: '#',
					icon: 'tabler:ruler',
					highlight: 'text-green10',
					description: 'navigation.universal_rules_desc'
				},
				{
					name: 'navigation.meeting_planning_white_paper',
					href: '#',
					icon: 'tabler:school',
					highlight: 'text-orange10',
					description: 'navigation.meeting_planning_white_paper_desc'
				},
				{
					name: 'navigation.late_handling_reference',
					href: '#',
					icon: 'tabler:flag',
					highlight: 'text-blue10',
					description: 'navigation.late_handling_reference_desc'
				},
				{
					name: 'navigation.talk_shit_definition_white_paper',
					href: '#',
					icon: 'tabler:message-report',
					highlight: 'text-purple10',
					description: 'navigation.talk_shit_definition_white_paper_desc'
				}
			]
		}
	}
];

export type NavigationDefinition = NavigationItem[];

type NavigationItem = PureNavItem | FlyoutNavItem;

interface PureNavItem {
	name: string;
	type: 'pure';
	href: string;
}

interface FlyoutNavItem {
	name: string;
	type: 'flyout';
	flyout: FlyoutDefinition | RichFlyoutDefinition;
}

interface FlyoutDefinition {
	rich: false;
	items: FlyoutItem[];
}

interface RichFlyoutDefinition {
	rich: true;
	items: RichFlyoutItem[];
}

interface FlyoutItem {
	name: string;
	href: string;
	description?: string;
}

interface RichFlyoutItem {
	name: string;
	href: string;
	icon: string;
	highlight: string;
	description: string;
}
