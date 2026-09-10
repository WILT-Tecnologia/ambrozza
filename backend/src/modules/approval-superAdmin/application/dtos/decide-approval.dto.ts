export interface DecideApprovalInputDto {
  approvalRequestId: string;
  superAdminId: string;
  action: 'APPROVE' | 'REJECT';
  reason?: string;
}

export interface DecideApprovalOutputDto {
  approvalRequestId: string;
  accountId: string;
  status: string;
  decidedAt: Date;
}
