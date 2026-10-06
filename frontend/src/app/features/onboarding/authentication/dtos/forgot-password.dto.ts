export interface ForgotPasswordRequestDto {
  email: string;
}

export interface ForgotPasswordResponseDto {
  message: string;
}

export interface VerifyResetCodeRequestDto {
  email: string;
  code: string;
}

export interface VerifyResetCodeResponseDto {
  resetToken: string;
}

export interface ResetPasswordRequestDto {
  resetToken: string;
  newPassword: string;
}

export interface ResetPasswordResponseDto {
  message: string;
}
