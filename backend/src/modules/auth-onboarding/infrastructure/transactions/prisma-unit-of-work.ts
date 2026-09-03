import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service';

import { PrismaAccountRepository } from '../repositories/prisma-account.repository';

import { PrismaApprovalRequestRepository } from 'src/modules/approval/infrastructure/repositories/prisma-approval-request.repository';
import { IUnitOfWork } from '../repositories/unit-of-work.interface';

@Injectable()
export class PrismaUnitOfWork implements IUnitOfWork {
  constructor(private readonly prisma: PrismaService) {}

  async execute<T>(
    callback: (
      accountRepository: PrismaAccountRepository,
      approvalRequestRepository: PrismaApprovalRequestRepository,
    ) => Promise<T>,
  ): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      const accountRepository = new PrismaAccountRepository(tx);

      const approvalRequestRepository = new PrismaApprovalRequestRepository(tx);

      return callback(accountRepository, approvalRequestRepository);
    });
  }
}
