import type { IApprovalRequestRepository } from '../../../approval/domain/repositories/approval-request.repository.interface';
import { IAccountRepository } from '../../domain/providers/repositories/account.repository.interface';

export interface IUnitOfWork {
  execute<T>(
    callback: (
      accountRepository: IAccountRepository,
      approvalRequestRepository: IApprovalRequestRepository,
    ) => Promise<T>,
  ): Promise<T>;
}

export const IUnitOfWorkToken = Symbol('IUnitOfWork');
