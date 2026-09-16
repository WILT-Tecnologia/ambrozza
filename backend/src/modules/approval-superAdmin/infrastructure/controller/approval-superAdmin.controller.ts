import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
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
  async getPending(
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('search') search = '',
  ) {
    return this.getPendingApprovalsUseCase.execute({
      page: Number(page),
      limit: Number(limit),
      search,
    });
  }

  @Post('decide')
  async decide(@Body() input: DecideApprovalInputDto, @Req() request: Request) {
    return this.decideApprovalUseCase.execute(input, request.user.sub);
  }
}
