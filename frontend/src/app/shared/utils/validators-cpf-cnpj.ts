import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfCnpjValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const numbers = value.replace(/\D/g, '');

  if (numbers.length === 11) {
    if (/^(\d)\1{10}$/.test(numbers)) return { invalidDocument: true };
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(numbers.charAt(i)) * (10 - i);
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(numbers.charAt(9))) return { invalidDocument: true };

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(numbers.charAt(i)) * (11 - i);
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(numbers.charAt(10))) return { invalidDocument: true };

    return null;
  }

  if (numbers.length === 14) {
    if (/^(\d)\1{13}$/.test(numbers)) return { invalidDocument: true };
    let length = numbers.length - 2;
    let numbersCheck = numbers.substring(0, length);
    const digits = numbers.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbersCheck.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return { invalidDocument: true };

    length = length + 1;
    numbersCheck = numbers.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbersCheck.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return { invalidDocument: true };

    return null;
  }

  return { invalidDocument: true };
}
