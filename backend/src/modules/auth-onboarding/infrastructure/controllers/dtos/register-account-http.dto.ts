import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RegisterAccountInputDto } from '../../../application/dtos/register-account.dto';

export class RegisterAccountHttpDto implements RegisterAccountInputDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name!: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  password!: string;
}
