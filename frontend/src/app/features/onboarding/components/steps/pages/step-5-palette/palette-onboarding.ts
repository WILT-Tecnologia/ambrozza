import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-step-5-palette',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div [formGroup]="form()" class="space-y-6">
      <div>
        <span
          class="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/60 px-2.5 py-1 rounded-md border border-amber-200/60 inline-block mb-3"
        >
          Passo 5 de {{ currentMaxStep() }}
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Qual será a alma visual da sua confeitaria?
        </h2>
        <p class="text-sm text-stone-500 mt-1.5">
          Selecione a identidade cromática que vai envolver o seu cardápio digital e hipnotizar seus
          clientes à primeira vista.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <label
          class="relative flex! flex-col justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all bg-white shadow-sm group hover:border-amber-900/40 overflow-hidden"
          [class.border-amber-950]="form().get('colorPalette')?.value === 'chocolate'"
          [class.border-stone-200]="form().get('colorPalette')?.value !== 'chocolate'"
          [class.ring-2]="form().get('colorPalette')?.value === 'chocolate'"
          [class.ring-amber-950_20]="form().get('colorPalette')?.value === 'chocolate'"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-amber-950/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"
          ></div>

          <div>
            <div class="flex! items-center justify-between mb-4">
              <div
                class="flex! items-center gap-1 bg-stone-100/90 p-1.5 rounded-2xl border border-stone-200/80 shadow-inner"
              >
                <span
                  class="w-4 h-4 rounded-full bg-amber-950 shadow-xs ring-1 ring-black/10"
                ></span>
                <span
                  class="w-4 h-4 rounded-full bg-amber-700 shadow-xs ring-1 ring-black/10"
                ></span>
                <span
                  class="w-4 h-4 rounded-full bg-amber-100 shadow-xs ring-1 ring-black/10"
                ></span>
              </div>
              <input
                type="radio"
                value="chocolate"
                formControlName="colorPalette"
                class="accent-amber-950 w-4 h-4 cursor-pointer"
              />
            </div>

            <span class="font-extrabold text-lg text-stone-900 block tracking-tight"
              >Chocolate & Cacau Nobre</span
            >
            <span class="text-xs text-stone-500 mt-1 block leading-relaxed">
              Tons densos de trufas e cacau puro. Sensação imediata de sofisticação, requinte e alta
              doçaria artesanal.
            </span>
          </div>

          <div
            class="mt-6 p-3.5 rounded-2xl bg-amber-950 text-white flex! items-center justify-between text-xs font-semibold shadow-md"
          >
            <span class="flex! items-center gap-2">
              <mat-icon class="flex! items-center justify-center text-xs w-4 h-4 text-amber-300"
                >workspace_premium</mat-icon
              >
              <span>Vitrine Trufa & Cacau</span>
            </span>
            <span
              class="bg-amber-800/80 text-amber-100 px-2.5 py-1 rounded-xl text-[10px] tracking-wider uppercase backdrop-blur-xs"
              >Tema Sugerido</span
            >
          </div>
        </label>

        <label
          class="relative flex! flex-col justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all bg-white shadow-sm group hover:border-amber-900/40 overflow-hidden"
          [class.border-amber-700]="form().get('colorPalette')?.value === 'caramel'"
          [class.border-stone-200]="form().get('colorPalette')?.value !== 'caramel'"
          [class.ring-2]="form().get('colorPalette')?.value === 'caramel'"
          [class.ring-amber-700_20]="form().get('colorPalette')?.value === 'caramel'"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-amber-600/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"
          ></div>

          <div>
            <div class="flex! items-center justify-between mb-4">
              <div
                class="flex! items-center gap-1 bg-stone-100/90 p-1.5 rounded-2xl border border-stone-200/80 shadow-inner"
              >
                <span
                  class="w-4 h-4 rounded-full bg-amber-600 shadow-xs ring-1 ring-black/10"
                ></span>
                <span
                  class="w-4 h-4 rounded-full bg-amber-300 shadow-xs ring-1 ring-black/10"
                ></span>
                <span
                  class="w-4 h-4 rounded-full bg-stone-100 shadow-xs ring-1 ring-black/10"
                ></span>
              </div>
              <input
                type="radio"
                value="caramel"
                formControlName="colorPalette"
                class="accent-amber-700 w-4 h-4 cursor-pointer"
              />
            </div>

            <span class="font-extrabold text-lg text-stone-900 block tracking-tight"
              >Baunilha & Caramelo Dourado</span
            >
            <span class="text-xs text-stone-500 mt-1 block leading-relaxed">
              Tons quentes de açúcar mascavo e manteiga queimada. Traz aquela atmosfera nostálgica
              de forno quente e bolos da avó.
            </span>
          </div>

          <div
            class="mt-6 p-3.5 rounded-2xl bg-amber-600 text-white flex! items-center justify-between text-xs font-semibold shadow-md"
          >
            <span class="flex! items-center gap-2">
              <mat-icon class="flex! items-center justify-center text-xs w-4 h-4 text-amber-100"
                >local_fire_department</mat-icon
              >
              <span>Vitrine Forno & Mel</span>
            </span>
            <span
              class="bg-amber-700/80 text-amber-50 px-2.5 py-1 rounded-xl text-[10px] tracking-wider uppercase backdrop-blur-xs"
              >Aconchegante</span
            >
          </div>
        </label>

        <label
          class="relative flex! flex-col justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all bg-white shadow-sm group hover:border-amber-900/40 overflow-hidden"
          [class.border-rose-600]="form().get('colorPalette')?.value === 'strawberry'"
          [class.border-stone-200]="form().get('colorPalette')?.value !== 'strawberry'"
          [class.ring-2]="form().get('colorPalette')?.value === 'strawberry'"
          [class.ring-rose-600_20]="form().get('colorPalette')?.value === 'strawberry'"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"
          ></div>

          <div>
            <div class="flex! items-center justify-between mb-4">
              <div
                class="flex! items-center gap-1 bg-stone-100/90 p-1.5 rounded-2xl border border-stone-200/80 shadow-inner"
              >
                <span
                  class="w-4 h-4 rounded-full bg-rose-500 shadow-xs ring-1 ring-black/10"
                ></span>
                <span
                  class="w-4 h-4 rounded-full bg-rose-200 shadow-xs ring-1 ring-black/10"
                ></span>
                <span
                  class="w-4 h-4 rounded-full bg-stone-50 shadow-xs ring-1 ring-black/10"
                ></span>
              </div>
              <input
                type="radio"
                value="strawberry"
                formControlName="colorPalette"
                class="accent-rose-600 w-4 h-4 cursor-pointer"
              />
            </div>

            <span class="font-extrabold text-lg text-stone-900 block tracking-tight"
              >Morango & Chantilly Suave</span
            >
            <span class="text-xs text-stone-500 mt-1 block leading-relaxed">
              Tons pastéis delicados inspirados em coberturas de glaçagem, morangos frescos e
              confeitarias de festa clássicas.
            </span>
          </div>

          <div
            class="mt-6 p-3.5 rounded-2xl bg-rose-600 text-white flex! items-center justify-between text-xs font-semibold shadow-md"
          >
            <span class="flex! items-center gap-2">
              <mat-icon class="flex! items-center justify-center text-xs w-4 h-4 text-rose-100"
                >favorite</mat-icon
              >
              <span>Vitrine Festa & Doce</span>
            </span>
            <span
              class="bg-rose-700/80 text-rose-50 px-2.5 py-1 rounded-xl text-[10px] tracking-wider uppercase backdrop-blur-xs"
              >Delicado</span
            >
          </div>
        </label>

        <label
          class="relative flex! flex-col justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all bg-white shadow-sm group hover:border-amber-900/40 overflow-hidden"
          [class.border-emerald-700]="form().get('colorPalette')?.value === 'pistachio'"
          [class.border-stone-200]="form().get('colorPalette')?.value !== 'pistachio'"
          [class.ring-2]="form().get('colorPalette')?.value === 'pistachio'"
          [class.ring-emerald-700_20]="form().get('colorPalette')?.value === 'pistachio'"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"
          ></div>

          <div>
            <div class="flex! items-center justify-between mb-4">
              <div
                class="flex! items-center gap-1 bg-stone-100/90 p-1.5 rounded-2xl border border-stone-200/80 shadow-inner"
              >
                <span
                  class="w-4 h-4 rounded-full bg-emerald-700 shadow-xs ring-1 ring-black/10"
                ></span>
                <span
                  class="w-4 h-4 rounded-full bg-emerald-200 shadow-xs ring-1 ring-black/10"
                ></span>
                <span
                  class="w-4 h-4 rounded-full bg-stone-100 shadow-xs ring-1 ring-black/10"
                ></span>
              </div>
              <input
                type="radio"
                value="pistachio"
                formControlName="colorPalette"
                class="accent-emerald-700 w-4 h-4 cursor-pointer"
              />
            </div>

            <span class="font-extrabold text-lg text-stone-900 block tracking-tight"
              >Pistache & Ninho Moderno</span
            >
            <span class="text-xs text-stone-500 mt-1 block leading-relaxed">
              Verdes elegantes combinados com a pureza do leite em pó. A grande tendência europeia e
              gourmet do mercado atual.
            </span>
          </div>

          <div
            class="mt-6 p-3.5 rounded-2xl bg-emerald-800 text-white flex! items-center justify-between text-xs font-semibold shadow-md"
          >
            <span class="flex! items-center gap-2">
              <mat-icon class="flex! items-center justify-center text-xs w-4 h-4 text-emerald-200"
                >bolt</mat-icon
              >
              <span>Vitrine Pistache & Ninho</span>
            </span>
            <span
              class="bg-emerald-900/80 text-emerald-100 px-2.5 py-1 rounded-xl text-[10px] tracking-wider uppercase backdrop-blur-xs"
              >Tendência</span
            >
          </div>
        </label>
      </div>

      <div
        class="p-4 rounded-2xl bg-amber-900/5 border border-amber-900/10 text-xs text-stone-700 leading-relaxed font-medium flex! items-center gap-3"
      >
        <mat-icon class="text-amber-900 flex! items-center justify-center shrink-0 w-5 h-5"
          >palette</mat-icon
        >
        <span
          >Você terá total liberdade para alternar entre estes temas ou personalizar as cores da sua
          vitrine digital diretamente no painel administrativo após finalizar.</span
        >
      </div>
    </div>
  `,
})
export class Step5PaletteComponent {
  currentMaxStep = input.required<number>();
  form = input.required<FormGroup>();
}
