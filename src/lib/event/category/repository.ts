import type { Repository } from '$lib/shared/shared/repository';
import { Entity } from '$lib/event/category/entity';
import { error } from '@sveltejs/kit';

import data from './data.json';
import { deserialize } from 'serializr';

export interface CategoryRepository extends Repository<string, Entity> {}

class InMemoryCategoryRepository implements CategoryRepository {
	private readonly categories: Entity[];

	constructor(categories: Entity[]) {
		this.categories = categories;
	}

	async findAll(): Promise<Entity[]> {
		return this.categories;
	}

	async findByPk(pk: string): Promise<Entity> {
		const category = this.categories.find((c) => c.key === pk);
		if (!category) {
			throw error(404, `Category with key ${pk} not found`);
		}
		return category;
	}
}

export const categoryRepository: CategoryRepository = new InMemoryCategoryRepository(
	deserialize(Entity, data)
);
