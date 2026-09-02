export type ApprovalStatusType = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ApprovalRequestProps {
  id?: string;
  accountId: string;
  status?: ApprovalStatusType;
  reason?: string;
  decidedBySuperAdminId?: string;
  decidedAt?: Date;
  createdAt?: Date;
}

export class ApprovalRequest {
  private props: ApprovalRequestProps;

  constructor(props: ApprovalRequestProps) {
    this.props = {
      ...props,
      status: props.status ?? 'PENDING',
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): string | undefined {
    return this.props.id;
  }
  get accountId(): string {
    return this.props.accountId;
  }
  get status(): ApprovalStatusType {
    return this.props.status!;
  }
  get reason(): string | undefined {
    return this.props.reason;
  }
  get decidedBySuperAdminId(): string | undefined {
    return this.props.decidedBySuperAdminId;
  }
  get decidedAt(): Date | undefined {
    return this.props.decidedAt;
  }
  get createdAt(): Date {
    return this.props.createdAt!;
  }

  approve(superAdminId: string): void {
    if (this.props.status !== 'PENDING') {
      throw new Error('Solicitação já possui uma decisão.');
    }
    this.props.status = 'APPROVED';
    this.props.decidedBySuperAdminId = superAdminId;
    this.props.decidedAt = new Date();
  }

  reject(superAdminId: string, reason: string): void {
    if (this.props.status !== 'PENDING') {
      throw new Error('Solicitação já possui uma decisão.');
    }
    if (!reason || reason.trim() === '') {
      throw new Error('O motivo da rejeição é obrigatório.');
    }
    this.props.status = 'REJECTED';
    this.props.reason = reason;
    this.props.decidedBySuperAdminId = superAdminId;
    this.props.decidedAt = new Date();
  }
}
