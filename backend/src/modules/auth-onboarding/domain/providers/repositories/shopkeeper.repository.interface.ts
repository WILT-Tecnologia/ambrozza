import { Shopkeeper } from '../../entities/shopkeeper.entity';

export interface IShopkeeperRepository {
  findByEmail(email: string): Promise<Shopkeeper | null>;
  findById(id: string): Promise<Shopkeeper | null>;
  create(shopkeeper: Shopkeeper): Promise<Shopkeeper>;
  updateApprovalStatus(shopkeeperId: string, status: string): Promise<void>;
  hasStore(shopkeeperId: string): Promise<boolean>;
}

export const IShopkeeperRepositoryToken = Symbol('IShopkeeperRepository');
