import {
  ApprovalRequest,
  ApprovalStatusType,
} from '../entities/administration-request.entity';

export interface IApprovalRequestRepository {
  findById(id: string): Promise<ApprovalRequest | null>;
  create(request: ApprovalRequest): Promise<ApprovalRequest>;
  save(request: ApprovalRequest): Promise<void>;
  findAllByStatus(status: ApprovalStatusType): Promise<ApprovalRequest[]>;
}

export const IApprovalRequestRepositoryToken = Symbol(
  'IApprovalRequestRepository',
);
