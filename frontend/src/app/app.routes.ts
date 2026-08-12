import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/presentation/pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent,
      ),
  },
  {
    path: 'galeria',
    loadComponent: () =>
      import('./features/gallery/presentation/pages/gallery-page/gallery-page.component').then(
        (m) => m.GalleryPageComponent,
      ),
  },
  {
    path: 'cardapio',
    loadComponent: () =>
      import('./features/menu/presentation/pages/menu-page/menu-page.component').then(
        (m) => m.MenuPageComponent,
      ),
  },
  {
    path: 'personalizar',
    loadComponent: () =>
      import('./features/customize/presentation/pages/customize-page/customize-page.component').then(
        (m) => m.CustomizePageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
