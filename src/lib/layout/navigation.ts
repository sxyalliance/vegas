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
