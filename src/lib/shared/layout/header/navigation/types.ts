import type { MessageId } from '$lib/shared/i18n';

export type NavigationDefinition = NavigationItem[];

export type NavigationItem = PureNavItem | FlyoutNavItem;

export interface PureNavItem {
	name: MessageId;
	type: 'pure';
	href: string;
}

export interface FlyoutNavItem {
	name: MessageId;
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
	name: MessageId;
	href: string;
	description?: MessageId;
}

export interface RichFlyoutItem {
	name: MessageId;
	href: string;
	icon: string;
	highlight: string;
	description: MessageId;
}
