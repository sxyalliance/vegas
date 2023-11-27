import * as m from '$i18n/messages';
import { languageTag, sourceLanguageTag } from '$i18n/runtime';

export const tPath = (href: string) => {
	return languageTag()
		? `/${languageTag() == sourceLanguageTag ? '' : languageTag()}${href}`
		: href;
};

export type MessageId = keyof typeof m;

export type mMapRecord = {
	[key: string]: () => string;
};

export const mEventCategoryName: mMapRecord = {
	dining: m.event_category_dining_name,
	entertainment: m.event_category_entertainment_name,
	academic: m.event_category_academic_name,
	sport: m.event_category_sport_name,
	giveaway: m.event_category_giveaway_name
};

export const mEventCategoryDescription: mMapRecord = {
	dining: m.event_category_dining_description,
	entertainment: m.event_category_entertainment_description,
	academic: m.event_category_academic_description,
	sport: m.event_category_sport_description,
	giveaway: m.event_category_giveaway_description
};
