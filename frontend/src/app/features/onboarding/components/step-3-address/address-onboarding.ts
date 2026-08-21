import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-3-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div [formGroup]="form()" class="space-y-6">
      <div>
        <span
          class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 inline-block mb-3"
          >Passo 3 de {{ currentMaxStep() }}</span
        >
        <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Onde sua produção está localizada?
        </h2>
        <p class="text-sm text-stone-500 mt-1.5">
          Endereço base para retirada de encomendas ou cálculo de entregas.
        </p>
      </div>

      <div class="space-y-4 pt-2">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
              >CEP *</label
            >
            <input
              type="text"
              formControlName="cep"
              placeholder="00000-000"
              class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white font-medium"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
              >Estado *</label
            >
            <input
              type="text"
              formControlName="state"
              placeholder="UF"
              class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white font-medium"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
              >Cidade *</label
            >
            <input
              type="text"
              formControlName="city"
              placeholder="Ex.: Gramado"
              class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white font-medium"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="sm:col-span-2">
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
              >Rua / Avenida *</label
            >
            <input
              type="text"
              formControlName="street"
              placeholder="Ex.: Av. das Hortênsias"
              class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white font-medium"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
              >Número *</label
            >
            <input
              type="text"
              formControlName="number"
              placeholder="Ex.: 450"
              class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white font-medium"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
              >Bairro *</label
            >
            <input
              type="text"
              formControlName="neighborhood"
              placeholder="Ex.: Centro"
              class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white font-medium"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider"
              >Complemento
              <span class="text-stone-400 font-normal lowercase">(opcional)</span></label
            >
            <input
              type="text"
              formControlName="complement"
              placeholder="Ex.: Apto 12 Bloco B"
              class="w-full px-4.5 py-3 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:border-amber-800 focus:bg-white font-medium"
            />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Step3AddressComponent {
  currentMaxStep = input.required<number>();
  form = input.required<FormGroup>();
}
