import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import { DndClassRequestResults } from '../../models/classes.interface';
import {ClassDetailsComponent} from "./classes-details/class-details.component";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectClassList } from '../../store/classes/classes.selectors';
import { IClass } from '../../models/IClass';
import {ApiObjectReference} from '../../models/api.interfaces';

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

  classes: ApiObjectReference[] | undefined;
  classCount: number | undefined;
  selectedClass: string | undefined;

  constructor(private store: Store) {
    this.classList$ = this.store.select(selectClassList);

    this.classList$.subscribe( (classes: IClass[]) => {
      this.classes = classes;
      this.classCount = classes.length;
    });
  }

  displayClass(selected: string):void  {
    this.selectedClass = selected;
    console.log("New class selected", this.selectedClass);
  }
}

