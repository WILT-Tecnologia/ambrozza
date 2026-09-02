import { Routes } from '@angular/router';
import { approvalGuard } from './core/guards/approval.guard';
import { onboardingGuard } from './core/guards/onboarding.guard';
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

  {
    path: 'register-shopkeeper/auth',
    loadComponent: () =>
      import('./features/onboarding/authentication/auth-page.component').then(
        (m) => m.AuthPageComponent,
      ),
  },
  {
    path: 'onboarding',
    canActivate: [onboardingGuard],
    loadComponent: () =>
      import('./features/onboarding/onboarding.component').then((m) => m.OnboardingComponent),
  },
  {
    path: 'approval/auth',
    loadComponent: () =>
      import('./features/approval/authentication/pages/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'approval-shopkeeper',
    canActivate: [approvalGuard],
    loadComponent: () =>
      import('./features/approval/pages/approval/approval-requests.component').then(
        (m) => m.ApprovalRequestsComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
