import { IsString, MinLength } from 'class-validator';

export class ResetPasswordHttpDto {
  @IsString()
  resetToken!: string;

  @IsString()
  @MinLength(8, {
    message: 'A senha deve ter pelo menos 8 caracteres.',
  })
  newPassword!: string;
}
