import { Inject, Injectable } from '@nestjs/common';

import {
  IApprovalRequestRepository,
  IApprovalRequestRepositoryToken,
} from '../../domain/repositories/approval-request.repository.interface';

interface Params {
  page: number;
  limit: number;
  search?: string;
}

@Injectable()
export class GetPendingApprovalsUseCase {
  constructor(
    @Inject(IApprovalRequestRepositoryToken)
    private readonly approvalRequestRepository: IApprovalRequestRepository,
  ) {}

  async execute({ page, limit, search }: Params) {
    const { data, total } =
      await this.approvalRequestRepository.findPaginatedByStatus('PENDING', {
        page,
        limit,
        search,
      });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
