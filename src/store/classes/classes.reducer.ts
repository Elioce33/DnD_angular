import { createFeature, createReducer, on } from "@ngrx/store";

import { classesActions } from "./classes.actions";
import { IClass } from "@models/class.interface";

export interface ModelState {
    classList: IClass[];
    loading: boolean;
}


const initialState: ModelState = {
    classList: [],
    loading: true
}


// ------- Classes Reducer -------
export const classReducer = createReducer(
    initialState,
    on(classesActions.loadClasses, state => ({
        ...state,
        loading: true,
    })),
    on(classesActions.loadClassesSuccess, (state, { classes }) => ({
        ...state,
        classList: classes,
        loading: false,
    })),
    on(classesActions.loadClassesFaillure, state => ({
        ...state,
        loading: false,
    }))
);
