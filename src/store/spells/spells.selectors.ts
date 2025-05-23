import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SpellsState } from "./spells.reducer";

export const selectSpellsState = createFeatureSelector<SpellsState>('spells');


export const selectSpellList = createSelector(
    selectSpellsState,
    (state: SpellsState) => state.spellList
)

export const selectSpellLoading = createSelector(
    selectSpellsState,
    (state: SpellsState) => state.loading
)
