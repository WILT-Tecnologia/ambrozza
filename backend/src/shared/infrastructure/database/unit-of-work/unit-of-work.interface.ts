import { IApprovalRequestRepository } from 'src/modules/approval-superAdmin/domain/repositories/approval-request.repository.interface';
import { IShopkeeperRepository } from 'src/modules/auth-onboarding/domain/providers/repositories/shopkeeper.repository.interface';

export interface IUnitOfWork {
  execute<T>(
    callback: (
      accountRepository: IShopkeeperRepository,
      approvalRequestRepository: IApprovalRequestRepository,
    ) => Promise<T>,
  ): Promise<T>;
}

export const IUnitOfWorkToken = Symbol('IUnitOfWork');
