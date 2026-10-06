import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-6-review',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div [formGroup]="form()" class="space-y-6">
      <div>
        <span
          class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 inline-block mb-3"
          >Passo 6 de {{ currentMaxStep() }}</span
        >
        <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Tudo pronto para assar o sucesso!
        </h2>
        <p class="text-sm text-stone-500 mt-1.5">
          Revise rapidinho os dados principais da sua confeitaria antes de publicar.
        </p>
      </div>

      <div class="space-y-3 pt-2">
        <div
          class="p-4.5 rounded-2xl bg-stone-50/70 border border-stone-200/80 flex items-center justify-between text-sm"
        >
          <div class="space-y-0.5">
            <span class="block text-[11px] font-bold text-stone-400 uppercase tracking-wider"
              >Confeitaria</span
            >
            <span class="font-extrabold text-stone-900 text-base">{{
              form().get('name')?.value || '-'
            }}</span>
            <span class="text-xs text-amber-800 font-medium block"
              >lojja.com/{{ form().get('slug')?.value }}</span
            >
          </div>
          <button
            type="button"
            (click)="goToStep.emit(1)"
            class="text-xs font-bold text-amber-800 hover:underline px-3 py-1.5 rounded-xl bg-amber-100/50 hover:bg-amber-100 transition-colors"
          >
            Editar
          </button>
        </div>

        <div
          class="p-4.5 rounded-2xl bg-stone-50/70 border border-stone-200/80 flex items-center justify-between text-sm"
        >
          <div class="space-y-0.5">
            <span class="block text-[11px] font-bold text-stone-400 uppercase tracking-wider"
              >Responsável & Endereço</span
            >
            <span class="font-extrabold text-stone-900 text-base">{{
              form().get('ownerName')?.value || '-'
            }}</span>
            <span class="text-xs text-stone-500 font-medium block"
              >{{ form().get('city')?.value || '-' }} /
              {{ form().get('state')?.value || '-' }}</span
            >
          </div>
          <button
            type="button"
            (click)="goToStep.emit(2)"
            class="text-xs font-bold text-amber-800 hover:underline px-3 py-1.5 rounded-xl bg-amber-100/50 hover:bg-amber-100 transition-colors"
          >
            Editar
          </button>
        </div>
      </div>

      <div class="space-y-3 pt-4 border-t border-stone-100">
        <label class="flex items-center gap-3 text-xs text-stone-600 cursor-pointer font-medium">
          <input
            type="checkbox"
            formControlName="acceptTerms"
            class="w-4.5 h-4.5 text-amber-800 rounded border-stone-300 accent-amber-800"
          />
          Li e concordo com os
          <a href="#" class="text-amber-800 underline font-bold">Termos de Uso</a> da plataforma
        </label>
        <label class="flex items-center gap-3 text-xs text-stone-600 cursor-pointer font-medium">
          <input
            type="checkbox"
            formControlName="acceptPrivacy"
            class="w-4.5 h-4.5 text-amber-800 rounded border-stone-300 accent-amber-800"
          />
          Li e concordo com a
          <a href="#" class="text-amber-800 underline font-bold">Política de Privacidade</a>
        </label>
      </div>
    </div>
  `,
})
export class Step6ReviewComponent {
  currentMaxStep = input.required<number>();
  form = input.required<FormGroup>();
  goToStep = output<number>();
}
