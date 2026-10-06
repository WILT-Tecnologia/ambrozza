import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),

    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
