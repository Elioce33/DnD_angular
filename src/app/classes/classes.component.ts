import { Component } from '@angular/core';
import {ClassDetailsComponent} from "./classes-details/class-details.component";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectClassList } from '../../store/classes/classes.selectors';
import { IClass } from '../../models/IClass';
import {ApiObjectReference} from '../../models/api.interfaces';
import {classesActions} from '../../store/classes/classes.actions';

@Component({
  selector: 'app-classes',
  imports: [
    ClassDetailsComponent
  ],
  templateUrl: `./classes.component.html`,
  styleUrl: `./classes.component.scss`
})
export class ClassesComponent {
  classList$: Observable<IClass[]> = new Observable<IClass[]>();

  classes: IClass[] | undefined;
  classCount: number | undefined;
  selectedClass: IClass | undefined;

  constructor(private store: Store) {
    this.classList$ = this.store.select(selectClassList);

    this.classList$.subscribe( (classes: IClass[]) => {
      this.classes = classes;
      this.classCount = classes.length;

      // check if class references were updated with full data
      if(!classes[0]?.updated_at) {
          this.store.dispatch( classesActions.loadClassesDetailFromReferences({classes}) );
      }
    });
  }

  displayClass(selected: IClass):void  {
    this.selectedClass = selected;
    console.log("New class selected", this.selectedClass);
  }
}

