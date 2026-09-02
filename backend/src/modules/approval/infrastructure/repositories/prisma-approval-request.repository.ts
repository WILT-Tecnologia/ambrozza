import { Injectable } from '@nestjs/common';
import {
  ApprovalStatus,
  ApprovalRequest as PrismaApprovalRequestModel,
} from '@prisma/client';
import { PrismaService } from '../../../../prisma/prisma.service';

import {
  ApprovalRequest,
  ApprovalStatusType,
} from '../../domain/entities/approval-request.entity';
import { IApprovalRequestRepository } from '../../domain/repositories/approval-request.repository.interface';

@Injectable()
export class PrismaApprovalRequestRepository implements IApprovalRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ApprovalRequest | null> {
    const record = await this.prisma.approvalRequest.findUnique({
      where: { id },
    });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  async create(request: ApprovalRequest): Promise<ApprovalRequest> {
    const record = await this.prisma.approvalRequest.create({
      data: {
        accountId: request.accountId,
        status: request.status as unknown as ApprovalStatus,
      },
    });
    return this.mapToDomain(record);
  }

  async save(request: ApprovalRequest): Promise<void> {
    await this.prisma.approvalRequest.update({
      where: { id: request.id },
      data: {
        status: request.status as unknown as ApprovalStatus,
        reason: request.reason,
        decidedBySuperAdminId: request.decidedBySuperAdminId,
        decidedAt: request.decidedAt,
      },
    });
  }

  async findAllByStatus(
    status: ApprovalStatusType,
  ): Promise<ApprovalRequest[]> {
    const records = await this.prisma.approvalRequest.findMany({
      where: { status: status as unknown as ApprovalStatus },
      orderBy: { createdAt: 'asc' },
    });

    return records.map((record: PrismaApprovalRequestModel) =>
      this.mapToDomain(record),
    );
  }

  private mapToDomain(record: PrismaApprovalRequestModel): ApprovalRequest {
    return new ApprovalRequest({
      id: record.id,
      accountId: record.accountId,
      status: record.status as unknown as ApprovalStatusType,
      reason: record.reason ?? undefined,
      decidedBySuperAdminId: record.decidedBySuperAdminId ?? undefined,
      decidedAt: record.decidedAt ?? undefined,
      createdAt: record.createdAt,
    });
  }
}
