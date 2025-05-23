import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs';
import {ApiService} from '../../app/api.service';
import {loadSpells, loadSpellsSuccess} from './spells.actions';
import {ApiListReference} from '../../app/api.interfaces';
import {Spell} from '../../app/spells/spells.interface';

export const spellsGetAll$ = createEffect(
  (action$ = inject(Actions), api = inject(ApiService)) => {
    return action$.pipe(
      ofType(loadSpells),
      switchMap( (action) => api.getSpells() ),
    map( (resp: ApiListReference<Spell>) => loadSpellsSuccess({ spells: resp.results }) )
    )
  }, {functional : true}
);
