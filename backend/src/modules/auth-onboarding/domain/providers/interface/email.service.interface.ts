export interface IEmailService {
  sendPasswordResetCode(email: string, code: string): Promise<void>;
}

export const IEmailServiceToken = Symbol('IEmailService');
