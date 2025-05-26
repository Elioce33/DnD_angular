import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs';
import {ApiService} from '../../app/api.service';
import {classesActions} from './classes.actions';
import { ClassDetailsInterface } from '../../models/class-details.interface';
import {ApiListReference} from '../../models/api.interfaces';

// ------- Class Effect -------
export const classesGetAll$ = createEffect(
  (action$ = inject(Actions), api = inject(ApiService)) => {
    return action$.pipe(
      ofType(classesActions.loadClasses),
      switchMap( () => api.getClasses() ),
      map( (resp: ApiListReference) => classesActions.loadClassesSuccess({ classes: resp.results as ClassDetailsInterface[] }) )
    )
  }, {functional : true}
);
