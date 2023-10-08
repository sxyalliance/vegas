export interface Repository<TKey, TEntity> {
	findAll(): Promise<TEntity[]>;

	findByPk(pk: TKey): Promise<TEntity>;
}
