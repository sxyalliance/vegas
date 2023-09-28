import type {
	BlockObjectResponse,
	PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export type Post = {
	blocks: BlockObjectResponse[];
	properties: PostProperties<unknown>;
};

export type PostProperties<T> = {
	title: string;
	slug: string;
	description: string;
	category: string;

	extra: T;
};

export interface PostPropertiesExtractor<T> {
	extract: (page: PageObjectResponse) => PostProperties<T>;
}

export const placeholderDoNotUse = 1;
