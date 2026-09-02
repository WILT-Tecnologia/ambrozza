export enum AccountApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface AccountProps {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  approvalStatus?: AccountApprovalStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Account {
  private props: AccountProps;

  constructor(props: AccountProps) {
    this.props = {
      ...props,
      approvalStatus: props.approvalStatus ?? AccountApprovalStatus.PENDING,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): string | undefined {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email.toLowerCase().trim();
  }
  get passwordHash(): string {
    return this.props.passwordHash;
  }
  get approvalStatus(): AccountApprovalStatus {
    return this.props.approvalStatus!;
  }
  get createdAt(): Date {
    return this.props.createdAt!;
  }
  get updatedAt(): Date {
    return this.props.updatedAt!;
  }

  isApproved(): boolean {
    return this.props.approvalStatus === AccountApprovalStatus.APPROVED;
  }

  isRejected(): boolean {
    return this.props.approvalStatus === AccountApprovalStatus.REJECTED;
  }
}
