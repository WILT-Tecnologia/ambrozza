import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-products',
  standalone: true,
  template: `
    <div
      class="w-full rounded-2xl border border-dashed border-(--border-color)
             bg-(--bg-surface) px-6 py-12 text-center"
    >
      <div
        class="mx-auto mb-4 flex h-14 w-14 items-center justify-center
               rounded-full bg-(--bg-card) border border-(--border-color)"
      >
        <svg
          class="w-6 h-6 text-(--text-muted)"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7h18M5 7l1 12h12l1-12M9 7V5a3 3 0 0 1 6 0v2"
          />
        </svg>
      </div>

      <h3 class="font-serif text-xl font-bold text-(--text-main)">
        Sua loja ainda não possui produtos
      </h3>

      <p class="mt-2 mx-auto max-w-md text-sm leading-relaxed text-(--text-muted)">
        Assim que você adicionar produtos ao seu catálogo, eles aparecerão aqui para seus clientes.
      </p>
    </div>
  `,
})
export class EmptyProductsComponent {
  @Input() message = 'Sua loja ainda não possui produtos para mostrar.';
}
