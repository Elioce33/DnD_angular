import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import { DndClassRequestResults } from './classes.interface';
import {ClassDetailsComponent} from "../classes-details/class-details.component";

@Component({
  selector: 'app-classes',
  imports: [
    ClassDetailsComponent
  ],
  template: `
    @if (!this.classCount) {
      <i>loading</i>
    } @else {
      <p>Total class count : {{classCount}}</p>
      <p>Selected class : {{selectedClass}}</p>

      <div class="container">
        <div class="list">
          <p>Class list : </p>
          <ul>
            @for (dndClass of this.classes; track dndClass.index) {
              <li class="{{selectedClass === dndClass.index ? 'selected' : ''}}">
                <div class="classListItem">
                  {{ dndClass.name }}
                </div>
                <button (click)="displayClass(dndClass.index)">show</button>
              </li>
            }
          </ul>
        </div>
        <div class="details">
          @if (this.selectedClass) {
              <app-class-details [classIndex]="this.selectedClass" />
          }
        </div>
      </div>
    }
  `,
  styleUrl: `./classes.component.css`
})
export class ClassesComponent {
  classes: DndClassRequestResults[] | undefined;
  classCount: number | undefined;
  selectedClass: string | undefined;

  constructor(private api: ApiService) {}

  getClasses():void {
    this.api.getClasses().subscribe(response => {
      this.classes = response.results;
      this.classCount = response.count;
    });
  }

  displayClass(selected: string):void  {
    this.selectedClass = selected;
    console.log("New class selected", this.selectedClass);
  }

  ngOnInit() {
    this.getClasses();
  }

}

