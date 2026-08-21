import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-step-4-operation',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div [formGroup]="form()" class="space-y-6">
      <div>
        <span
          class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 inline-block mb-3"
          >Passo 4 de {{ currentMaxStep() }}</span
        >
        <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Como você entrega seus doces?
        </h2>
        <p class="text-sm text-stone-500 mt-1.5">
          Escolha as modalidades que sua confeitaria vai disponibilizar aos clientes.
        </p>
      </div>

      <div class="space-y-3.5 pt-2">
        <label
          class="flex items-start gap-4 p-4.5 rounded-2xl border border-stone-200/90 cursor-pointer hover:border-amber-800/40 hover:bg-amber-50/20 transition-all bg-white shadow-xs"
        >
          <input
            type="checkbox"
            formControlName="allowDelivery"
            class="mt-1 w-5 h-5 text-amber-800 rounded border-stone-300 focus:ring-amber-800/20 accent-amber-800"
          />
          <div>
            <span class="block font-bold text-sm text-stone-900"
              >Serviço de Entrega (Delivery)</span
            >
            <span class="text-xs text-stone-500 mt-0.5 block"
              >Quero enviar os bolos e doces fresquinhos direto na casa dos clientes.</span
            >
          </div>
        </label>

        <label
          class="flex items-start gap-4 p-4.5 rounded-2xl border border-stone-200/90 cursor-pointer hover:border-amber-800/40 hover:bg-amber-50/20 transition-all bg-white shadow-xs"
        >
          <input
            type="checkbox"
            formControlName="allowPickup"
            class="mt-1 w-5 h-5 text-amber-800 rounded border-stone-300 focus:ring-amber-800/20 accent-amber-800"
          />
          <div>
            <span class="block font-bold text-sm text-stone-900"
              >Retirada na Confeitaria / Balcão</span
            >
            <span class="text-xs text-stone-500 mt-0.5 block"
              >Quero permitir que venham retirar encomendas ou comprar pronta-entrega no
              local.</span
            >
          </div>
        </label>
      </div>

      <div
        class="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs text-amber-900 leading-relaxed font-medium flex items-center gap-3"
      >
        <mat-icon class="text-amber-800 flex! items-center justify-center shrink-0 w-5 h-5"
          >info</mat-icon
        >
        <span
          >Fique tranquila(o): horários de funcionamento, taxas de entrega e cardápio de produtos
          poderão ser ajustados com calma logo após a abertura.</span
        >
      </div>
    </div>
  `,
})
export class Step4OperationComponent {
  currentMaxStep = input.required<number>();
  form = input.required<FormGroup>();
}
