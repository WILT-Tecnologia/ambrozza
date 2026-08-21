import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-2-owner',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div [formGroup]="form()" class="space-y-6">
      <div>
        <span
          class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 inline-block mb-3"
          >Passo 2 de {{ currentMaxStep() }}</span
        >
        <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Quem comanda a cozinha?
        </h2>
        <p class="text-sm text-stone-500 mt-1.5">
          Precisamos saber quem é o responsável legal e principal contato da confeitaria.
        </p>
      </div>

      <div class="space-y-4 pt-2">
        <div>
          <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
            >Nome completo da(o) responsável *</label
          >
          <input
            type="text"
            formControlName="ownerName"
            placeholder="Ex.: Maria Clara Azevedo"
            class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-800/10 font-medium"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
              >CPF ou CNPJ *</label
            >
            <input
              type="text"
              formControlName="document"
              placeholder="000.000.000-00"
              class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-800/10 font-medium"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
              >WhatsApp para Pedidos *</label
            >
            <input
              type="text"
              formControlName="phone"
              placeholder="(00) 90000-0000"
              class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-800/10 font-medium"
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
            >E-mail de acesso *</label
          >
          <input
            type="email"
            formControlName="email"
            class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-100 text-stone-500 text-sm cursor-not-allowed font-medium"
          />
          <span class="text-xs text-stone-400 mt-1.5 block"
            >Este e-mail está vinculado à sua conta de login.</span
          >
        </div>
      </div>
    </div>
  `,
})
export class Step2OwnerComponent {
  currentMaxStep = input.required<number>();
  form = input.required<FormGroup>();
}
