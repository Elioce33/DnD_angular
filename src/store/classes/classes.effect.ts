import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs';
import {ApiService} from '../../app/api.service';
import {classesActions} from './classes.actions';
import { IClass } from '@models/class.interface';
import {ApiListReference} from '@models/api.interfaces';

// ------- Class Effect -------
export const classesGetAll$ = createEffect(
  (action$ = inject(Actions), api = inject(ApiService)) => {
    return action$.pipe(
      ofType(classesActions.loadClasses),
      switchMap( () => api.getClasses() ),
      map( (resp: ApiListReference) => classesActions.loadClassesSuccess({ classes: resp.results as IClass[] }) )
    )
  }, {functional : true}
);


export const updateClassFromReferences$ = createEffect(
    (action$ = inject(Actions), api = inject(ApiService)) => {
        return action$.pipe(
            ofType(classesActions.loadClassesDetailFromReferences),
            switchMap( ( action) => api.getAllReferences<IClass>(action.classes) ),
            map(classList => classesActions.loadClassesSuccess({classes: classList}) )
        )
    }, {functional : true}
);
