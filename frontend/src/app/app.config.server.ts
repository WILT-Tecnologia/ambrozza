import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ssrCookieInterceptor } from './interceptors/ssr-cookie.interceptor';
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),

    provideHttpClient(withInterceptors([ssrCookieInterceptor, authInterceptor])),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
