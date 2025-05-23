import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs';
import {ApiService} from '../app/api.service';
import {spellsActions} from './store.actions';
import {ApiListReference} from '../models/api.interfaces';
import {Spell} from '../models/spells.interface';

export const spellsGetAll$ = createEffect(
  (action$ = inject(Actions), api = inject(ApiService)) => {
    return action$.pipe(
      ofType(spellsActions.loadSpells),
      switchMap( () => api.getSpells() ),
      map( (resp: ApiListReference) => spellsActions.loadSpellsSuccess({ spells: resp.results as Spell[] }) )
    )
  }, {functional : true}
);
