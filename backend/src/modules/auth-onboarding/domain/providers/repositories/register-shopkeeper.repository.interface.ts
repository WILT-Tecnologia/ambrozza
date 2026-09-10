import { ApprovalRequest } from '../../../../approval-superAdmin/domain/entities/administration-request.entity';
import { Shopkeeper } from '../../entities/shopkeeper.entity';

export interface IRegisterAccountRepository {
  createAccountWithApprovalRequest(
    account: Shopkeeper,
    approvalRequest: ApprovalRequest,
  ): Promise<Shopkeeper>;
}

export const IRegisterAccountRepositoryToken = Symbol(
  'IRegisterAccountRepository',
);
