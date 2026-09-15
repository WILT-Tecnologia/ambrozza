import { Inject, Injectable } from '@nestjs/common';

import {
  IApprovalRequestRepository,
  IApprovalRequestRepositoryToken,
} from '../../domain/repositories/approval-request.repository.interface';

@Injectable()
export class GetPendingApprovalsUseCase {
  constructor(
    @Inject(IApprovalRequestRepositoryToken)
    private readonly approvalRequestRepository: IApprovalRequestRepository,
  ) {}

  async execute() {
    const requests =
      await this.approvalRequestRepository.findAllByStatus('PENDING');

    return requests.map((request) => ({
      id: request.id!,
      accountId: request.shopkeeperId,
      status: request.status,
      createdAt: request.createdAt,
    }));
  }
}
