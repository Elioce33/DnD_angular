import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ModelState } from "./spells.reducer";

export const selectModelState = createFeatureSelector<ModelState>('spells');


export const selectSpellList = createSelector(
    selectModelState,
    (state: ModelState) => state.spellList
);

export const selectSpellLoading = createSelector(
    selectModelState,
    (state: ModelState) => state.spellLoading
);
