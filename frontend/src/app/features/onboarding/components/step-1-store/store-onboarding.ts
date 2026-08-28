import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from '../../../../shared/components/form-error.component.ts/form-error.component';
import { getGroupClasses, getInputClasses } from '../../styles/form-styles';

@Component({
  selector: 'app-step-1-store',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  template: `
    <div [formGroup]="form()" class="space-y-6">
      <div>
        <span
          class="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 inline-block mb-3"
        >
          Passo 1 de {{ currentMaxStep() }}
        </span>

        <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Qual o nome da sua doceria ou confeitaria?
        </h2>

        <p class="text-sm text-stone-500 mt-1.5">
          É assim que seus clientes vão te encontrar na vitrine digital.
        </p>
      </div>

      <div class="space-y-4 pt-2">
        <div>
          <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
            Nome da Confeitaria *
          </label>

          <input
            type="text"
            formControlName="name"
            placeholder="Ex.: Doce Encanto Bolos & Afetos"
            [class]="getInputClass('name')"
          />

          <app-form-error [control]="form().get('name')" />
        </div>

        <div>
          <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
            Link exclusivo da sua loja *
          </label>

          <div [class]="getGroupClass('slug')">
            <span
              class="bg-stone-100 px-4 py-3 text-stone-400 text-sm border-r border-stone-200 select-none flex items-center font-medium"
            >
              lojja.com/
            </span>

            <input
              type="text"
              formControlName="slug"
              placeholder="doce-encanto"
              class="w-full px-4 py-3 bg-transparent text-stone-900 text-sm focus:outline-none font-medium"
            />
          </div>

          <app-form-error [control]="form().get('slug')" />

          @if (
            !form().get('slug')?.invalid ||
            (!form().get('slug')?.touched && !form().get('slug')?.dirty)
          ) {
            <span class="text-xs text-stone-400 mt-1.5 block">
              Sua vitrine ficará em:

              <strong class="text-stone-600">
                lojja.com/{{ form().get('slug')?.value || 'sua-confeitaria' }}
              </strong>
            </span>
          }
        </div>

        <div>
          <label class="block text-xs font-bold text-stone-700 mb-2 uppercase tracking-wider">
            Breve descrição
          </label>

          <textarea
            formControlName="description"
            rows="3"
            placeholder="Ex.: Especializada em bolos artesanais, tortas finas e doces para festas..."
            [class]="getInputClass('description')"
          ></textarea>
          <app-form-error [control]="form().get('description')" />
          <span class="text-xs text-stone-400 mt-1 block">
            Escreva uma breve apresentação da sua loja para exibir aos clientes no cardápio digital.
          </span>
        </div>
      </div>
    </div>
  `,
})
export class Step1StoreComponent {
  currentMaxStep = input.required<number>();

  form = input.required<FormGroup>();

  getInputClass(fieldName: string): string {
    return getInputClasses(this.form().get(fieldName));
  }

  getGroupClass(fieldName: string): string {
    return getGroupClasses(this.form().get(fieldName));
  }
}
