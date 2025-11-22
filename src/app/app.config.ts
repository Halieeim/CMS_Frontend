import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './auth/jwt.interceptor';
import { errorInterceptor } from './interceptors/error-interceptor'; // <-- Updated
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
        errorInterceptor  // <-- Register error handler here
      ])
    ),
    provideRouter(routes)
  ]
};
