export enum ShopkeeperApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface ShopkeeperProps {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  approvalStatus?: ShopkeeperApprovalStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Shopkeeper {
  private props: ShopkeeperProps;

  constructor(props: ShopkeeperProps) {
    this.props = {
      ...props,
      approvalStatus: props.approvalStatus ?? ShopkeeperApprovalStatus.PENDING,
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
  get approvalStatus(): ShopkeeperApprovalStatus {
    return this.props.approvalStatus!;
  }
  get createdAt(): Date {
    return this.props.createdAt!;
  }
  get updatedAt(): Date {
    return this.props.updatedAt!;
  }

  isApproved(): boolean {
    return this.props.approvalStatus === ShopkeeperApprovalStatus.APPROVED;
  }

  isRejected(): boolean {
    return this.props.approvalStatus === ShopkeeperApprovalStatus.REJECTED;
  }
}
