import type { Repository } from '$lib/shared/shared/repository';
import type { Client } from '$lib/server/notion/client';
import { constructClient } from '$lib/server/notion/client';
import type { PostPropertiesExtractor } from '$lib/server/notion/types';
import {
	makeNotNullable,
	mapPropertyToDate,
	mapPropertyToPrimitive
} from '$lib/server/notion/utils';
import type { Member } from '$lib/member/member/entity';

import MaskData from 'maskdata';
import { getAllPosts, getPostById } from '$lib/server/notion';
import { error } from '@sveltejs/kit';

const { maskEmail2, maskPhone } = MaskData;

export interface MemberRepository extends Repository<string, Member> {}

const extractor: PostPropertiesExtractor<Member> = {
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

class NotionMemberRepository implements MemberRepository {
	private readonly client: Client;

	constructor() {
		this.client = constructClient({
			integrationSecret: 'secret_SSIPpymveUd3gSYyFQarQFzNVWNfoHq56cN9AfDyKXe',
			databaseId: '68c2752434514bf68110fbe3ce115199',
			extractor
		});
	}

	async findAll(): Promise<Member[]> {
		const result = await getAllPosts<Member>(this.client);
		if (result.isErr()) {
			throw error(result.error.code, result.error.message);
		}
		return result.value;
	}

	async findByPk(pk: string): Promise<Member> {
		const result = await getPostById<Member>(this.client, pk);

		if (result.isErr()) {
			throw error(result.error.code, result.error.message);
		}
		return result.value.properties;
	}
}

export const memberRepository: MemberRepository = new NotionMemberRepository();
