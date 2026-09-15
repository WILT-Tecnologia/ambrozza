import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { DecideApprovalInputDto } from '../../application/dtos/decide-approval.dto';
import { DecideApprovalUseCase } from '../../application/use-cases/decide-approval.use-case';
import { GetPendingApprovalsUseCase } from '../../application/use-cases/get-pending-approvals.use-case';

@Controller('approval')
export class ApprovalController {
  constructor(
    private readonly decideApprovalUseCase: DecideApprovalUseCase,
    private readonly getPendingApprovalsUseCase: GetPendingApprovalsUseCase,
  ) {}

  @Get('pending')
  async getPending() {
    return this.getPendingApprovalsUseCase.execute();
  }

  @Post('decide')
  async decide(@Body() input: DecideApprovalInputDto, @Req() request: Request) {
    return this.decideApprovalUseCase.execute(input, request.user.sub);
  }
}
