import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export type PostProperties<T> = {
	title: string;
	slug: string;
	description: string;
	category: string;

	extra: T;
};

export interface PostExtraPropertiesExtractor<T> {
	(post: PageObjectResponse): T;
}

export const placeholderDoNotUse = 1;
