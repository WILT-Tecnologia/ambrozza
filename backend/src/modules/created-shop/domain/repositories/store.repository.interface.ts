import { Store } from '../entities/store.entity';

export interface IStoreRepository {
  findById(id: string): Promise<Store | null>;

  findBySlug(slug: string): Promise<Store | null>;

  findByShopkeeperId(shopkeeperId: string): Promise<Store | null>;

  create(store: Store): Promise<Store>;
}

export const IStoreRepositoryToken = Symbol('IStoreRepository');
