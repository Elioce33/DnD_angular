import { createFeature, createReducer, on } from "@ngrx/store";

import { ISpell } from "../../models/spells.interface";
import { spellsActions } from "./spells.actions";


export interface ModelState {
    spellList: ISpell[];
    spellLoading: boolean;
}

const initialState: ModelState = {
    spellList: [],
    spellLoading: true
}

// ------- Spells Reducer -------
export const spellReducer = createReducer(
    initialState,
    on(spellsActions.loadSpells, (state) => ({
      ...state,
      spellLoading: true
    })),
    // on(spellsActions.loadSpellsFromReferences, (state, pagination) => ({
    //   ...state,
    //   spellLoading: true
    // })),
    on(spellsActions.loadSpellsSuccess, (state, { spells }) => ({
      ...state,
      spellList: spells,
      spellLoading: false
    })),
    on(spellsActions.loadSpellsFaillure, (state) => ({
      ...state,
      spellLoading: false
    })),
);
