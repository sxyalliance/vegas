import type { NavigationDefinition } from './types';

export const definition: NavigationDefinition = [
	{
		name: 'navigation_home',
		type: 'pure',
		href: '/'
	},
	{
		name: 'navigation_about',
		type: 'flyout',
		flyout: {
			rich: false,
			items: [
				{
					name: 'navigation_members',
					href: '/about/members'
				},
				{
					name: 'navigation_chronicle',
					href: '/about/chronicle'
				}
			]
		}
	},
	{
		name: 'navigation_resources',
		type: 'flyout',
		flyout: {
			rich: false,
			items: [
				{
					name: 'navigation_dictionary',
					href: '/dictionary'
				},
				{
					name: 'navigation_events',
					href: '/events'
				}
			]
		}
	},
	{
		name: 'navigation_other',
		type: 'flyout',
		flyout: {
			rich: true,
			items: [
				{
					name: 'navigation_universal_rules',
					href: '#',
					icon: 'tabler:ruler',
					highlight: 'text-green10',
					description: 'navigation_universal_rules_desc'
				},
				{
					name: 'navigation_meeting_planning_white_paper',
					href: '#',
					icon: 'tabler:school',
					highlight: 'text-orange10',
					description: 'navigation_meeting_planning_white_paper_desc'
				},
				{
					name: 'navigation_late_handling_reference',
					href: '#',
					icon: 'tabler:flag',
					highlight: 'text-blue10',
					description: 'navigation_late_handling_reference_desc'
				},
				{
					name: 'navigation_talk_shit_definition_white_paper',
					href: '#',
					icon: 'tabler:message-report',
					highlight: 'text-purple10',
					description: 'navigation_talk_shit_definition_white_paper_desc'
				}
			]
		}
	}
];
