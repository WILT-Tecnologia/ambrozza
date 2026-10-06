import { Shop } from '../entities/shop.entity';

export const IShopRepository = Symbol('IShopRepository');

export interface IShopRepository {
  findById(id: string): Promise<Shop | null>;
  findBySlug(slug: string): Promise<Shop | null>;
  findByShopkeeperId(shopkeeperId: string): Promise<Shop[]>;
  findByName(name: string): Promise<Shop | null>;
}
