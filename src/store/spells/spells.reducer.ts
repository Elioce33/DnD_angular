import { createFeature, createReducer, createSelector, on } from "@ngrx/store";

import { Spell } from "../../app/spells/spells.interface";
import { loadSpells, loadSpellsEchec, loadSpellsSuccess } from "./spells.actions";

export interface SpellsState {
    spellList: Spell[];
    loading: boolean;
}


const initialState: SpellsState = {
    spellList: [],
    loading: true
}

export const spellsReducer = createReducer(
    initialState,
    on(loadSpells, state => ({
        ...state,
        loading: true
    })),
    on(loadSpellsSuccess, (state, { spells }) => ({
        ...state,
        spellList: spells,
        loading: false
    })),
    on(loadSpellsEchec, state => ({
        ...state,
        loading: false
    }))
)

export const spellFeature = createFeature({
    name: 'spells',
    reducer: spellsReducer
})