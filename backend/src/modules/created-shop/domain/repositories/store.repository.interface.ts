import { Store } from '../entities/created-store.entity';

export interface IStoreRepository {
  findById(id: string): Promise<Store | null>;
  findByName(name: string): Promise<Store | null>;
  findBySlug(slug: string): Promise<Store | null>;

  findByShopkeeperId(shopkeeperId: string): Promise<Store[]>;

  create(store: Store): Promise<Store>;
}

export const IStoreRepositoryToken = Symbol('IStoreRepository');
