import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="min-h-screen flex items-center justify-center px-6 py-12 bg-[#fffaf5]">
      <section class="w-full max-w-2xl text-center">
        <div class="mb-8 flex justify-center">
          <div
            class="w-24 h-24 rounded-full bg-[#f3e3d3] flex items-center justify-center shadow-sm"
          >
            <span class="text-5xl">🍰</span>
          </div>
        </div>

        <p class="mb-3 text-sm font-semibold tracking-[0.25em] uppercase text-[#a56b45]">404</p>

        <h1 class="text-4xl md:text-5xl font-semibold tracking-tight text-[#3d2b20]">
          Ops... esse pedaço sumiu.
        </h1>

        <p class="mt-5 mx-auto max-w-lg text-base md:text-lg leading-relaxed text-[#806f63]">
          A página que você está procurando não existe ou não está mais disponível nesta loja.
        </p>

        <div class="mt-8 flex justify-center">
          <a
            routerLink="/"
            class="inline-flex items-center justify-center rounded-xl
                   bg-[#6f4934] px-6 py-3.5
                   text-sm font-semibold text-white
                   shadow-sm transition
                   hover:bg-[#5c3b2b]
                   focus:outline-none focus:ring-2
                   focus:ring-[#6f4934] focus:ring-offset-2"
          >
            Voltar para o início
          </a>
        </div>

        <div class="mt-12 flex items-center justify-center gap-3">
          <span class="h-px w-12 bg-[#e5d5c7]"></span>

          <span class="text-sm text-[#b49b8a]"> Ambrozza </span>

          <span class="h-px w-12 bg-[#e5d5c7]"></span>
        </div>
      </section>
    </main>
  `,
})
export class NotFoundPageComponent {}
