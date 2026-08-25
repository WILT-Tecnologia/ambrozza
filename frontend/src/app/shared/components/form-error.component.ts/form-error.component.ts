import { Component, effect, input, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  template: `
    @if (showError()) {
      <span class="text-[11px] text-rose-600 font-semibold mt-1.5 block">
        {{ errorMessage() }}
      </span>
    }
  `,
})
export class FormErrorComponent {
  control = input<AbstractControl | null>(null);

  showError = signal(false);
  errorMessage = signal('');

  constructor() {
    effect((onCleanup) => {
      const control = this.control();

      if (!control) {
        this.showError.set(false);
        this.errorMessage.set('');
        return;
      }

      const updateError = () => {
        const shouldShow = control.invalid && (control.touched || control.dirty);

        this.showError.set(shouldShow);
        this.errorMessage.set(shouldShow ? this.getErrorMessage(control) : '');
      };

      updateError();

      const subscription = control.events.subscribe(() => {
        updateError();
      });

      onCleanup(() => {
        subscription.unsubscribe();
      });
    });
  }

  private getErrorMessage(control: AbstractControl): string {
    if (!control.errors) {
      return '';
    }

    const errors = control.errors;

    if (typeof errors['message'] === 'string') {
      return errors['message'];
    }

    if (typeof errors['errorMessage'] === 'string') {
      return errors['errorMessage'];
    }

    if (errors['required']) {
      return 'Este campo é obrigatório.';
    }

    if (errors['minlength']) {
      return `Este campo deve ter no mínimo ${errors['minlength'].requiredLength} caracteres.`;
    }

    if (errors['maxlength']) {
      return `Este campo deve ter no máximo ${errors['maxlength'].requiredLength} caracteres.`;
    }

    if (errors['pattern']) {
      return 'O formato informado é inválido.';
    }

    if (errors['email']) {
      return 'Informe um e-mail válido.';
    }

    if (errors['requiredTrue']) {
      return 'Você precisa aceitar este campo.';
    }

    return 'Valor inválido.';
  }
}
