export type NavigationDefinition = NavigationItem[];

export type NavigationItem = PureNavItem | FlyoutNavItem;

export interface PureNavItem {
	name: string;
	type: 'pure';
	href: string;
}

export interface FlyoutNavItem {
	name: string;
	type: 'flyout';
	flyout: FlyoutDefinition | RichFlyoutDefinition;
}

export interface FlyoutDefinition {
	rich: false;
	items: FlyoutItem[];
}

export interface RichFlyoutDefinition {
	rich: true;
	items: RichFlyoutItem[];
}

export interface FlyoutItem {
	name: string;
	href: string;
	description?: string;
}

export interface RichFlyoutItem {
	name: string;
	href: string;
	icon: string;
	highlight: string;
	description: string;
}
