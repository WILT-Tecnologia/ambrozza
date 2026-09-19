import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordHttpDto {
  @IsString()
  @IsEmail({}, { message: 'E-mail inválido.' })
  email!: string;

  @IsString()
  code!: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  newPassword!: string;
}
