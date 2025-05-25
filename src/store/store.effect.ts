import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {combineLatest, map, of, switchMap, withLatestFrom} from 'rxjs';
import {ApiService} from '../app/api.service';
import {spellsActions} from './store.actions';
import {ApiListReference} from '../models/api.interfaces';
import {Spell} from '../models/spells.interface';
import {Store} from '@ngrx/store';
import {selectSpellList} from './store.selectors';


export const spellsGetAll$ = createEffect(
  (action$ = inject(Actions), api = inject(ApiService)) => {
    return action$.pipe(
      ofType(spellsActions.loadSpells),
      switchMap( () => api.getSpells() ),
      map( (resp: ApiListReference) => spellsActions.loadSpellsSuccess({ spells: resp.results as Spell[] }) )
    )
  }, {functional : true}
);

export const updateSpellFromReferences$ = createEffect(
  (action$ = inject(Actions), api = inject(ApiService), store = inject(Store)) => {
    return action$.pipe(
      ofType(spellsActions.loadSpellsFromReferences),
      withLatestFrom(store.select(selectSpellList)),
      // @ts-ignore
      switchMap( ([pagination, stateSpellList]) => {
        return combineLatest([
          of(stateSpellList),
          api.getAllReferences<Spell>(stateSpellList, pagination)
        ])
      }),
      map( ( [stateSpellList, spellList] ) => {
        const actualSpellList: Spell[] = stateSpellList;
        const updatedSpellList = actualSpellList.map ( (spell) => {
          const updatedSpell = spellList.find( s => s.name === spell.name );
          return updatedSpell ? updatedSpell : spell;
        });

        return spellsActions.loadSpellsSuccess({ spells : updatedSpellList});
      } )
    )
  }, {functional : true}
);
