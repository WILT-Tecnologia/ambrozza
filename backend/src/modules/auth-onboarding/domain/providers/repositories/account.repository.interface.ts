import { Account } from '../../entities/account.entity';

export interface IAccountRepository {
  findByEmail(email: string): Promise<Account | null>;
  findById(id: string): Promise<Account | null>;
  create(account: Account): Promise<Account>;
  updateApprovalStatus(accountId: string, status: string): Promise<void>;
  hasStore(accountId: string): Promise<boolean>;
}

export const IAccountRepositoryToken = Symbol('IAccountRepository');
