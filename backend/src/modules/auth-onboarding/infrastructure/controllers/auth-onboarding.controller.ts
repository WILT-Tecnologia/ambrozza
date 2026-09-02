import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { type Response } from 'express';
import { RegisterAccountUseCase } from '../../application/use-cases/register-account.use-case';
import { RegisterAccountHttpDto } from '../controllers/dtos/register-account-http.dto';

@Controller('auth-onboarding')
export class AuthOnboardingController {
  constructor(
    private readonly registerAccountUseCase: RegisterAccountUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterAccountHttpDto) {
    const result = await this.registerAccountUseCase.execute(dto);

    return {
      ...result,
      message:
        'Solicitação de criação de conta enviada com sucesso! Aguarde a aprovação.',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { email: string; pass: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = 'TOKEN_DE_REFRESH_AQUI';
    const accessToken = 'TOKEN_DE_ACESSO_AQUI';

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth-onboarding/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken,
      account: { id: '1', email: body.email, status: 'PENDENTE' },
    };
  }
}
