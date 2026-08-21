import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/lading-page/home/presentation/pages/home-page/home-page.component').then(
            (m) => m.HomePageComponent,
          ),
      },
      {
        path: 'galeria',
        loadComponent: () =>
          import('./features/lading-page/gallery/presentation/pages/gallery-page/gallery-page.component').then(
            (m) => m.GalleryPageComponent,
          ),
      },
      {
        path: 'cardapio',
        loadComponent: () =>
          import('./features/lading-page/menu/presentation/pages/menu-page/menu-page.component').then(
            (m) => m.MenuPageComponent,
          ),
      },
      {
        path: 'personalizar',
        loadComponent: () =>
          import('./features/lading-page/customize/presentation/pages/customize-page/customize-page.component').then(
            (m) => m.CustomizePageComponent,
          ),
      },
    ],
  },
  // Rota de criação de loja isolada
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./features/onboarding/onboarding.component').then((m) => m.OnboardingComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
