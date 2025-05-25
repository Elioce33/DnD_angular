import { createFeature, createReducer, createSelector, on } from "@ngrx/store";

import { Spell } from "../models/spells.interface";
import { spellsActions } from "./store.actions";

export interface ModelState {
    spellList: Spell[];
    loading: boolean;
}


const initialState: ModelState = {
    spellList: [],
    loading: true
}

export const storeReducer = createReducer(
    initialState,
    on(spellsActions.loadSpells, state => ({
        ...state,
        loading: true
    })),
    on(spellsActions.loadSpellsFromReferences, (state, pagination) => {
      return {
        ...state,
        loading: true
      };
    }),
    on(spellsActions.loadSpellsSuccess, (state, { spells }) => ({
        ...state,
        spellList: spells,
        loading: false
    })),
    on(spellsActions.loadSpellsFaillure, state => ({
        ...state,
        loading: false
    }))
)

export const spellFeature = createFeature({
    name: 'spells',
    reducer: storeReducer
})
