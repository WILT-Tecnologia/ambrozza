import { Component, input } from '@angular/core';

@Component({
  selector: 'app-onboarding-steps',
  standalone: true,
  template: `
    <div
      class="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-sm flex items-center justify-between overflow-x-auto gap-2"
    >
      @for (step of [1, 2, 3, 4, 5, 6]; track step) {
        <div class="flex items-center gap-2.5 min-w-max">
          <div
            [class]="
              currentStep() === step
                ? 'w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-amber-800/20'
                : currentStep() > step
                  ? 'w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs'
                  : 'w-8 h-8 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center font-bold text-xs'
            "
          >
            {{ step }}
          </div>
          <span
            [class]="
              currentStep() === step
                ? 'text-xs font-bold text-stone-900 whitespace-nowrap'
                : currentStep() > step
                  ? 'text-xs font-medium text-stone-700 whitespace-nowrap'
                  : 'text-xs font-medium text-stone-400 whitespace-nowrap'
            "
          >
            @switch (step) {
              @case (1) {
                Confeitaria
              }
              @case (2) {
                Doceira(o)
              }
              @case (3) {
                Endereço
              }
              @case (4) {
                Operação
              }
              @case (5) {
                Visual
              }
              @case (6) {
                Revisão
              }
            }
          </span>
        </div>
        @if (step < 6) {
          <div class="hidden sm:block flex-1 h-px bg-stone-200 mx-3"></div>
        }
      }
    </div>
  `,
})
export class OnboardingStepsComponent {
  currentStep = input.required<number>();
}
