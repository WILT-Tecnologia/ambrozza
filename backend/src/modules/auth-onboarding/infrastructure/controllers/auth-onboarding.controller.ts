import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { type Request, type Response } from 'express';
import { ForgotPasswordUseCase } from '../../application/use-cases/forgot-password.use-case';
import { LoginShopkeeperUseCase } from '../../application/use-cases/login-shopkeeper.use-case';
import { RefreshShopkeeperTokenUseCase } from '../../application/use-cases/refresh-shopkeeper-token.use-case';
import { RegisterShopkeeperUseCase } from '../../application/use-cases/register-shopkeeper.use-case';
import { ResendResetCodeUseCase } from '../../application/use-cases/resend-reset-code.use-case';
import { ResetPasswordUseCase } from '../../application/use-cases/reset-password.use-case';
import { VerifyResetCodeUseCase } from '../../application/use-cases/verify-reset-code.use-case';
import { ForgotPasswordHttpDto } from './dtos/forgot-password-http.dto';
import { LoginShopkeeperHttpDto } from './dtos/login-shopkeeper-http.dto';
import { RegisterShopkeeperHttpDto } from './dtos/register-shopkeeper-http.dto';
import { ResetPasswordHttpDto } from './dtos/reset-password-http.dto';
import { VerifyResetCodeHttpDto } from './dtos/verify-reset-code-http.dto';
const REFRESH_COOKIE_NAME = 'shopkeeperRefreshToken';
const REFRESH_COOKIE_PATH = '/auth-onboarding/refresh';

@Controller('auth-onboarding')
export class AuthOnboardingController {
  constructor(
    private readonly registerAccountUseCase: RegisterShopkeeperUseCase,
    private readonly loginShopkeeperUseCase: LoginShopkeeperUseCase,
    private readonly refreshShopkeeperTokenUseCase: RefreshShopkeeperTokenUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly verifyResetCodeUseCase: VerifyResetCodeUseCase,
    private readonly resendResetCodeUseCase: ResendResetCodeUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterShopkeeperHttpDto) {
    const { confirmPassword, ...registerInput } = dto;
    const result = await this.registerAccountUseCase.execute(registerInput);

    return {
      ...result,
      message:
        'Solicitação de criação de conta enviada com sucesso! Aguarde a aprovação.',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginShopkeeperHttpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.loginShopkeeperUseCase.execute(dto);

    this.setRefreshCookie(response, result.refreshToken);

    return {
      accessToken: result.accessToken,
      shopkeeper: result.shopkeeper,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() request: Request) {
    const refreshToken = request.cookies?.[REFRESH_COOKIE_NAME];
    return this.refreshShopkeeperTokenUseCase.execute(refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(REFRESH_COOKIE_NAME, { path: REFRESH_COOKIE_PATH });
    return { message: 'Logout realizado com sucesso.' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordHttpDto) {
    await this.resetPasswordUseCase.execute(dto.resetToken, dto.newPassword);

    return {
      message: 'Senha alterada com sucesso.',
    };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordHttpDto) {
    await this.forgotPasswordUseCase.execute(dto.email);

    return {
      message:
        'Você receberá um código de recuperação em instantes no seu e-mail.',
    };
  }

  @Post('resend-reset-code')
  @HttpCode(HttpStatus.OK)
  async resendResetCode(@Body() dto: ForgotPasswordHttpDto) {
    await this.resendResetCodeUseCase.execute(dto.email);

    return {
      message: 'Você receberá um novo código de recuperação em instantes.',
    };
  }

  @Post('verify-reset-code')
  @HttpCode(HttpStatus.OK)
  async verifyResetCode(@Body() dto: VerifyResetCodeHttpDto) {
    const resetToken = await this.verifyResetCodeUseCase.execute(
      dto.email,
      dto.code,
    );

    return {
      resetToken,
    };
  }

  private setRefreshCookie(response: Response, refreshToken: string): void {
    response.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: REFRESH_COOKIE_PATH,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
