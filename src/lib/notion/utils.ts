import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const mapPropertyToPrimitive = (
	property: PageObjectResponse['properties'][string]
): string | null => {
	switch (property.type) {
		case 'title':
			return property.title.map((t) => t.plain_text).join('');
		case 'rich_text':
			return property.rich_text.map((t) => t.plain_text).join('');
		case 'select':
			return property.select?.name ?? null;
		case 'number':
			return property.number?.toString() ?? null;
		case 'relation':
			return property.relation?.map((r) => r.id).join(',') ?? null;
		case 'unique_id':
			return property.unique_id
				? (property.unique_id.prefix || '') + property.unique_id.number
				: null;
		default:
			throw new Error(`Unknown property type ${property.type}`);
	}
};

export const mapPropertyToDate = (
	property: PageObjectResponse['properties'][string]
): Date | null => {
	switch (property.type) {
		case 'date':
			return property.date ? new Date(property.date.start) : null;
		default:
			throw new Error(`Unknown property type ${property.type}`);
	}
};

export const makeNotNullable = <T>(value: T | null): T => {
	if (value === null) {
		throw new Error('Value is null');
	}

	return value;
};
