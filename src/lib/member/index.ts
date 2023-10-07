import type { PostPropertiesExtractor } from '$lib/notion/types';
import { makeNotNullable, mapPropertyToDate, mapPropertyToPrimitive } from '$lib/notion/utils';
import { getAllPosts, getPostByCriteria, getPostById } from '$lib/notion';
import { error } from '@sveltejs/kit';
import { registerClient } from '$lib/notion/config';
import MaskData from 'maskdata';

const { maskEmail2, maskPhone } = MaskData;

export type MemberProperties = {
	name: string;
	residence: string | null;
	membershipDate: Date | null;
	email: string | null;
	phone: string | null;
};

export const extractor: PostPropertiesExtractor<MemberProperties> = {
	extract: async (page) => {
		let email = mapPropertyToPrimitive(page.properties['電郵地址']);
		if (email) {
			email = maskEmail2(email);
		}

		let phone = mapPropertyToPrimitive(page.properties['電話號碼']);
		if (phone) {
			phone = maskPhone(phone);
		}

		return {
			name: makeNotNullable(mapPropertyToPrimitive(page.properties['昵稱'])),
			residence: mapPropertyToPrimitive(page.properties['常住地']),
			membershipDate: mapPropertyToDate(page.properties['加入日期']),
			email,
			phone
		};
	}
};

export const getAllMembers = async (): Promise<MemberProperties[]> => {
	const result = await getAllPosts<MemberProperties>('member');
	if (result.isErr()) {
		throw error(result.error.code, result.error.message);
	}
	return result.value;
};

export const getMemberByName = async (name: string): Promise<MemberProperties> => {
	const result = await getPostByCriteria<MemberProperties>('member', {
		filter: {
			property: '昵稱',
			title: {
				equals: name
			}
		}
	});

	if (result.isErr()) {
		throw error(result.error.code, result.error.message);
	}
	return result.value.properties;
};

export const getMemberById = async (id: string): Promise<MemberProperties> => {
	const result = await getPostById<MemberProperties>('member', id);

	if (result.isErr()) {
		throw error(result.error.code, result.error.message);
	}
	return result.value.properties;
};

registerClient('member', {
	integrationSecret: 'secret_SSIPpymveUd3gSYyFQarQFzNVWNfoHq56cN9AfDyKXe',
	databaseId: '68c2752434514bf68110fbe3ce115199',
	extractor
});
