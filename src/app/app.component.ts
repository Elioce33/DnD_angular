import { Component } from '@angular/core';
import {ClassesComponent} from "./classes/classes.component";

@Component({
  selector: 'app-root',
  imports: [ClassesComponent],
  template: `
    <div>
        <h1>D&D information here</h1>
        <div>
            <h1>List of classes</h1>
            <app-classes></app-classes>
        </div>
    </div>
    `,
})
export class AppComponent {
  title = 'DnD_api_reader';
}
