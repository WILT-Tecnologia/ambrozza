import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const digits = String(value).replace(/\D/g, '');

  // Telefone brasileiro:
  // Fixo:    10 dígitos
  // Celular: 11 dígitos
  if (digits.length !== 10 && digits.length !== 11) {
    return { invalidPhone: true };
  }

  // DDD deve possuir 2 dígitos e estar entre 11 e 99
  const ddd = Number(digits.substring(0, 2));

  if (ddd < 11 || ddd > 99) {
    return { invalidPhone: true };
  }

  // Se possuir 11 dígitos, obrigatoriamente é celular
  // e o terceiro dígito deve ser 9.
  if (digits.length === 11 && digits[2] !== '9') {
    return { invalidPhone: true };
  }

  // Se possuir 10 dígitos, o primeiro dígito após o DDD
  // deve estar entre 2 e 5 (numeração tradicional de fixos).
  if (digits.length === 10) {
    const firstDigit = Number(digits[2]);

    if (firstDigit < 2 || firstDigit > 5) {
      return { invalidPhone: true };
    }
  }

  return null;
}
