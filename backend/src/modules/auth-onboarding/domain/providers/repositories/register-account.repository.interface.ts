import { ApprovalRequest } from '../../../../approval/domain/entities/approval-request.entity';
import { Account } from '../../entities/account.entity';

export interface IRegisterAccountRepository {
  createAccountWithApprovalRequest(
    account: Account,
    approvalRequest: ApprovalRequest,
  ): Promise<Account>;
}

export const IRegisterAccountRepositoryToken = Symbol(
  'IRegisterAccountRepository',
);
