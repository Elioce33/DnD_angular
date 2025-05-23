import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import { DndClassRequestResults } from './classes.interface';
import {ClassDetailsComponent} from "./classes-details/class-details.component";

@Component({
  selector: 'app-classes',
  imports: [
    ClassDetailsComponent
  ],
  templateUrl: `./classes.component.html`,
  styleUrl: `./classes.component.scss`
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

