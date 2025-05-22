import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BASE_URL} from "./app.tokens";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: BASE_URL, useValue: 'https://www.dnd5eapi.co' },
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)
  ]
};
