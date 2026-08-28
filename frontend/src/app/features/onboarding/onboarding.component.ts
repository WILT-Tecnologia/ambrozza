import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth.service';
import { cpfCnpjValidator } from '../../shared/utils/validators-cpf-cnpj';
import { phoneValidator } from '../../shared/utils/validators-phone';
import { OnboardingStepsComponent } from './components/onboarding-steps.component';
import { Step1StoreComponent } from './components/step-1-store/store-onboarding';
import { Step2OwnerComponent } from './components/step-2-owner/owner-onboarding';
import { Step3AddressComponent } from './components/step-3-address/address-onboarding';
import { Step4OperationComponent } from './components/step-4-operation/operation-onboarding';
import { Step5PaletteComponent } from './components/step-5-palette/palette-onboarding';
import { Step6ReviewComponent } from './components/step-6-review/review-onboarding';
@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    OnboardingStepsComponent,
    Step1StoreComponent,
    Step2OwnerComponent,
    Step3AddressComponent,
    Step4OperationComponent,
    Step6ReviewComponent,
    Step5PaletteComponent,
  ],
  template: `
    <div
      class="min-h-screen bg-linear-to-br from-stone-100 via-amber-50/40 to-stone-200/60 flex flex-col font-sans text-stone-900 selection:bg-amber-200 selection:text-amber-900"
    >
      <header
        class="w-full bg-white/80 backdrop-blur-md border-b border-stone-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-xs"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-2xl bg-amber-900/10 border border-amber-900/20 flex items-center justify-center text-amber-900 shadow-xs"
          >
            <mat-icon class="text-amber-900 flex! items-center justify-center">store</mat-icon>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-lg tracking-tight text-stone-900 leading-none"
              >Ambrozza</span
            >
            <span class="text-[10px] font-semibold text-amber-900/80 tracking-wider uppercase mt-1"
              >Sua Loja Virtual de Doces</span
            >
          </div>
        </div>
      </header>

      <main class="flex-1 max-w-4xl w-full mx-auto px-4 py-10 flex flex-col gap-8">
        <app-onboarding-steps [currentStep]="currentStep()" />

        <div
          class="bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-900/5"
        >
          <form [formGroup]="onboardingForm" (ngSubmit)="submit()">
            @switch (currentStep()) {
              @case (1) {
                <app-step-1-store [currentMaxStep]="currentMaxStep" [form]="onboardingForm" />
              }
              @case (2) {
                <app-step-2-owner [currentMaxStep]="currentMaxStep" [form]="onboardingForm" />
              }
              @case (3) {
                <app-step-3-address [currentMaxStep]="currentMaxStep" [form]="onboardingForm" />
              }
              @case (4) {
                <app-step-4-operation [currentMaxStep]="currentMaxStep" [form]="onboardingForm" />
              }
              @case (5) {
                <app-step-5-palette [currentMaxStep]="currentMaxStep" [form]="onboardingForm" />
              }
              @case (6) {
                <app-step-6-review
                  [currentMaxStep]="currentMaxStep"
                  [form]="onboardingForm"
                  (goToStep)="goToStep($event)"
                />
              }
            }

            <div class="flex items-center justify-between mt-10 pt-6 border-t border-stone-200/60">
              @if (currentStep() > 1) {
                <button
                  type="button"
                  (click)="prevStep()"
                  class="px-5 py-3 rounded-2xl border border-stone-300/80 text-stone-700 text-sm font-semibold hover:bg-stone-100 hover:text-stone-900 transition-all cursor-pointer"
                >
                  ← Voltar
                </button>
              } @else {
                <div></div>
              }

              @if (currentStep() < this.currentMaxStep) {
                <button
                  type="button"
                  (click)="nextStep()"
                  class="px-7 py-3 rounded-2xl bg-amber-900 text-white text-sm font-semibold hover:bg-amber-950 transition-all cursor-pointer shadow-md shadow-amber-950/20 active:scale-[0.98]"
                >
                  Continuar →
                </button>
              } @else {
                <button
                  type="submit"
                  [disabled]="!onboardingForm.valid"
                  class="px-7 py-3 rounded-2xl bg-amber-900 text-white text-sm font-semibold hover:bg-amber-950 transition-all cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed shadow-md shadow-amber-950/20 active:scale-[0.98] flex items-center gap-2"
                >
                  <mat-icon class="text-white flex! items-center justify-center text-sm w-5 h-5"
                    >check_circle</mat-icon
                  >
                  Cadastrar minha Confeitaria
                </button>
              }
            </div>
          </form>
        </div>
      </main>
    </div>
  `,
})
export class OnboardingComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  currentMaxStep = 6;
  currentStep = signal(1);
  onboardingForm: FormGroup;
  constructor() {
    const currentUser = this.authService.getCurrentUser();
    this.onboardingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      slug: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(250)]],

      ownerName: [
        currentUser?.name || '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(80)],
      ],
      document: ['', [Validators.required, cpfCnpjValidator]],
      phone: ['', [Validators.required, phoneValidator]],
      email: [{ value: currentUser?.email || '', disabled: true }],

      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      number: ['', [Validators.required, Validators.maxLength(10)]],
      neighborhood: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      complement: ['', [Validators.maxLength(60)]],

      allowDelivery: [true],
      allowPickup: [false],
      acceptTerms: [false, Validators.requiredTrue],
      acceptPrivacy: [false, Validators.requiredTrue],
      colorPalette: ['chocolate', Validators.required],
    });
  }

  nextStep(): void {
    const step = this.currentStep();

    const stepFields: Record<number, string[]> = {
      1: ['name', 'slug', 'description'],
      2: ['ownerName', 'document', 'phone'],
      3: ['cep', 'state', 'city', 'street', 'number', 'neighborhood'],
    };

    const fields = stepFields[step];

    if (fields) {
      let hasError = false;

      fields.forEach((fieldName) => {
        const control = this.onboardingForm.get(fieldName);
        if (control?.invalid) {
          control.markAsTouched();

          hasError = true;
        }
      });

      if (hasError) {
        return;
      }
    }

    if (step === 4) {
      const delivery = this.onboardingForm.get('allowDelivery')?.value;
      const pickup = this.onboardingForm.get('allowPickup')?.value;

      if (!delivery && !pickup) {
        this.onboardingForm.get('allowDelivery')?.markAsTouched();
        this.onboardingForm.get('allowPickup')?.markAsTouched();

        return;
      }
    }

    if (step === 5) {
      const colorPalette = this.onboardingForm.get('colorPalette');

      if (colorPalette?.invalid) {
        colorPalette.markAsTouched();
        return;
      }
    }

    this.currentStep.update((s) => Math.min(s + 1, this.currentMaxStep));
  }

  prevStep() {
    this.currentStep.update((s) => Math.max(s - 1, 1));
  }

  goToStep(step: number) {
    this.currentStep.set(step);
  }

  get isCurrentStepValid(): boolean {
    const step = this.currentStep();

    if (step === 1) {
      return !!(this.onboardingForm.get('name')?.valid && this.onboardingForm.get('slug')?.valid);
    }
    if (step === 2) {
      return !!(
        this.onboardingForm.get('ownerName')?.valid &&
        this.onboardingForm.get('document')?.valid &&
        this.onboardingForm.get('phone')?.valid
      );
    }
    if (step === 3) {
      return !!(
        this.onboardingForm.get('cep')?.valid &&
        this.onboardingForm.get('state')?.valid &&
        this.onboardingForm.get('city')?.valid &&
        this.onboardingForm.get('street')?.valid &&
        this.onboardingForm.get('number')?.valid &&
        this.onboardingForm.get('neighborhood')?.valid
      );
    }
    return true;
  }

  submit() {
    if (this.onboardingForm.valid) {
      console.log('Dados do Onboarding:', this.onboardingForm.getRawValue());
    }
  }
}
