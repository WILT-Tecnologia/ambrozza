import { Inject, Injectable } from '@nestjs/common';
import {
  ApprovalStatus,
  Prisma,
  ApprovalRequest as PrismaApprovalRequestModel,
} from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import {
  ApprovalRequest,
  ApprovalStatusType,
} from '../../domain/entities/administration-request.entity';
import {
  ApprovalRequestListItem,
  FindPaginatedByStatusParams,
  IApprovalRequestRepository,
  PaginatedResult,
} from '../../domain/repositories/approval-request.repository.interface';

@Injectable()
export class PrismaApprovalRequestRepository implements IApprovalRequestRepository {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService | Prisma.TransactionClient,
  ) {}

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
        shopkeeperId: request.shopkeeperId,
        status: request.status as unknown as ApprovalStatus,
      },
    });
    return this.mapToDomain(record);
  }

  async save(request: ApprovalRequest): Promise<boolean> {
    const result = await this.prisma.approvalRequest.updateMany({
      where: {
        id: request.id,
        status: ApprovalStatus.PENDING,
      },
      data: {
        status: request.status as unknown as ApprovalStatus,
        reason: request.reason,
        decidedBySuperAdminId: request.decidedBySuperAdminId,
        decidedAt: request.decidedAt,
      },
    });

    return result.count === 1;
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

  async findPaginatedByStatus(
    status: ApprovalStatusType,
    { page, limit, search }: FindPaginatedByStatusParams,
  ): Promise<PaginatedResult<ApprovalRequestListItem>> {
    const skip = (page - 1) * limit;

    const where: Prisma.ApprovalRequestWhereInput = {
      status: status as unknown as ApprovalStatus,
      ...(search && {
        shopkeeper: {
          is: {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } },
            ],
          },
        },
      }),
    };

    const [records, total] = await Promise.all([
      this.prisma.approvalRequest.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { shopkeeper: { select: { name: true, email: true } } },
      }),
      this.prisma.approvalRequest.count({ where }),
    ]);

    return {
      data: records.map((record) => ({
        id: record.id,
        shopkeeperId: record.shopkeeperId,
        shopkeeperName: record.shopkeeper.name,
        shopkeeperEmail: record.shopkeeper.email,
        status: record.status as unknown as ApprovalStatusType,
        createdAt: record.createdAt,
      })),
      total,
    };
  }

  private mapToDomain(record: PrismaApprovalRequestModel): ApprovalRequest {
    return new ApprovalRequest({
      id: record.id,
      shopkeeperId: record.shopkeeperId,
      status: record.status as unknown as ApprovalStatusType,
      reason: record.reason ?? undefined,
      decidedBySuperAdminId: record.decidedBySuperAdminId ?? undefined,
      decidedAt: record.decidedAt ?? undefined,
      createdAt: record.createdAt,
    });
  }
}
