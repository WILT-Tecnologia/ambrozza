import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../../../../shared/components/form-error.component.ts/form-error.component';
import { formatCpfCnpj, formatPhone } from '../../../../shared/utils/document-mask';
import { getInputClasses } from '../../styles/form-styles';

@Component({
  selector: 'app-step-2-owner',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  template: `
    <div [formGroup]="form()" class="space-y-6">
      <div>
        <span
          class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 inline-block mb-3"
        >
          Passo 2 de {{ currentMaxStep() }}
        </span>

        <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Quem comanda a cozinha?
        </h2>

        <p class="text-sm text-stone-500 mt-1.5">
          Precisamos saber quem é o responsável legal e principal contato da confeitaria.
        </p>
      </div>

      <div class="space-y-4 pt-2">
        <div>
          <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
            Nome completo da(o) responsável *
          </label>

          <input
            type="text"
            formControlName="ownerName"
            placeholder="Ex.: Maria Clara Azevedo"
            [class]="getInputClass('ownerName')"
          />

          <app-form-error [control]="form().get('ownerName')" />
        </div>

        <!-- CPF/CNPJ + WHATSAPP -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- CPF / CNPJ -->
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
              CPF ou CNPJ *
            </label>

            <input
              type="text"
              formControlName="document"
              placeholder="Digite CPF ou CNPJ"
              (input)="formatDocument($event)"
              [class]="getInputClass('document')"
              maxlength="18"
            />

            <app-form-error [control]="form().get('document')" />
          </div>

          <!-- WHATSAPP -->
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
              WhatsApp para cadastro *
            </label>

            <input
              type="text"
              formControlName="phone"
              placeholder="(00) 90000-0000"
              maxlength="15"
              (input)="formatPhoneInput($event)"
              [class]="getInputClass('phone')"
            />

            <app-form-error [control]="form().get('phone')" />
          </div>
        </div>

        <!-- E-MAIL -->
        <div>
          <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
            E-mail de acesso *
          </label>

          <input
            type="email"
            formControlName="email"
            class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-100 text-stone-500 text-sm cursor-not-allowed font-medium"
          />

          <span class="text-xs text-stone-400 mt-1.5 block">
            Este e-mail está vinculado à sua conta de login.
          </span>
        </div>
      </div>
    </div>
  `,
})
export class Step2OwnerComponent {
  currentMaxStep = input.required<number>();
  form = input.required<FormGroup>();

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form().get(fieldName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
  getInputClass(fieldName: string): string {
    return getInputClasses(this.form().get(fieldName));
  }

  formatDocument(event: Event): void {
    const input = event.target as HTMLInputElement;
    const control = this.form().get('document');
    const formatted = formatCpfCnpj(input.value);
    input.value = formatted;
    control?.setValue(formatted, {
      emitEvent: false,
    });
  }
  formatPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const control = this.form().get('phone');
    const formatted = formatPhone(input.value);
    input.value = formatted;
    control?.setValue(formatted, {
      emitEvent: false,
    });
  }
}
