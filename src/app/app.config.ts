import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BASE_URL} from "./app.tokens";
import {provideHttpClient} from "@angular/common/http";
import {provideEffects} from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

import { spellReducer } from '../store/spells/spells.reducer';
import { spellsGetAll$, updateSpellFromReferences$} from '../store/spells/spells.effect';

import {classReducer} from '../store/classes/classes.reducer';
import {classesGetAll$, updateClassFromReferences$} from '../store/classes/classes.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: BASE_URL, useValue: 'https://www.dnd5eapi.co' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),

    // Provide reducers
    provideState({ name: 'spells', reducer: spellReducer }),
    provideState({ name: 'classes', reducer: classReducer }),

    // Provide effects
    provideEffects({
      // Spell effects
      spellsGetAll$,
      updateSpellFromReferences$,
      // Class effects
      classesGetAll$,
      updateClassFromReferences$
    })
  ]
};
