import { IsEmail, IsString } from 'class-validator';

export class ForgotPasswordHttpDto {
  @IsString()
  @IsEmail({}, { message: 'E-mail inválido.' })
  email!: string;
}
