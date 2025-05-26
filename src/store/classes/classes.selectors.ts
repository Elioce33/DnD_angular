import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ModelState } from "./classes.reducer";

export const selectModelState = createFeatureSelector<ModelState>('classes');

export const selectClassList = createSelector(
    selectModelState,
    (state: ModelState) => state.classList
);
