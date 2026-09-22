import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyResetCodeHttpDto {
  @IsEmail({}, { message: 'E-mail inválido.' })
  email!: string;

  @IsString()
  @Length(6, 6, { message: 'O código deve ter 6 dígitos.' })
  code!: string;
}
