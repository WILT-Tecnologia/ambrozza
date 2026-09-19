import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';

import { IEmailService } from '../../domain/providers/interface/email.service.interface';

@Injectable()
export class EmailService implements IEmailService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendPasswordResetCode(email: string, code: string): Promise<void> {
    const { error } = await this.resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [email],
      subject: 'Código de recuperação de senha',
      html: `
        <div>
          <h2>Recuperação de senha</h2>

          <p>Você solicitou a recuperação da sua senha.</p>

          <p>Seu código de recuperação é:</p>

          <h1>${code}</h1>

          <p>Esse código é válido por 10 minutos.</p>

          <p>
            Se você não solicitou a recuperação de senha,
            ignore este e-mail.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('ERRO RESEND:', error);
      throw new InternalServerErrorException(
        'Não foi possível enviar o e-mail de recuperação.',
      );
    }
  }
}
