import {
  ApprovalRequest,
  ApprovalStatusType,
} from '../entities/administration-request.entity';

export interface ApprovalRequestListItem {
  id: string;
  shopkeeperId: string;
  shopkeeperName: string;
  shopkeeperEmail: string;
  status: ApprovalStatusType;
  createdAt: Date;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface FindPaginatedByStatusParams {
  page: number;
  limit: number;
  search?: string;
}

export interface IApprovalRequestRepository {
  findById(id: string): Promise<ApprovalRequest | null>;
  create(request: ApprovalRequest): Promise<ApprovalRequest>;
  save(request: ApprovalRequest): Promise<void>;
  findAllByStatus(status: ApprovalStatusType): Promise<ApprovalRequest[]>;

  findPaginatedByStatus(
    status: ApprovalStatusType,
    params: FindPaginatedByStatusParams,
  ): Promise<PaginatedResult<ApprovalRequestListItem>>;
}

export const IApprovalRequestRepositoryToken = Symbol(
  'IApprovalRequestRepository',
);
