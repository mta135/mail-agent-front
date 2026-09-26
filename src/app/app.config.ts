import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { routes } from './routes/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true })

  ]
};
