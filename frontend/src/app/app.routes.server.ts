import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'approval/auth',
    renderMode: RenderMode.Client,
  },
  {
    path: 'approval-shopkeeper',
    renderMode: RenderMode.Client,
  },
  {
    path: 'register-shopkeeper/auth',
    renderMode: RenderMode.Client,
  },
  {
    path: 'onboarding',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
