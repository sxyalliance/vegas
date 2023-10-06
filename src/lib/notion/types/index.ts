import type {
	BlockObjectResponse,
	PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export type Post = {
	blocks: BlockObjectResponse[];
	properties: unknown;
};

export interface PostPropertiesExtractor<T> {
	extract: (page: PageObjectResponse) => T | null;
}

export const placeholderDoNotUse = 1;
