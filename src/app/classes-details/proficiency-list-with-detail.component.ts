import {Component, Input} from '@angular/core';
import {ApiService} from '../api.service';
import {ProficiencyDetailsComponent} from '../proficiency-details/proficiency-details.component';
import {Proficiencies} from './class-details.interface';


@Component({
  selector: 'app-proficiency-list-with-details',
  imports: [
    ProficiencyDetailsComponent
  ],
  template: `
    <div class="proficiencies">
      <h3>Proficiencies</h3>
      <div class="container">
        <div class="list">
          <ul>
            @for (proficiency of proficienciesList; track proficiency.index) {
              <li>
                <a class="clickable" (click)="proficiencyDetails(proficiency)">{{ proficiency.name }}</a>
              </li>
            }
          </ul>
        </div>
        <div class="details">
          @if (!selectedProficiency) {
            Select a proficiency to show more information
          } @else {
            <app-proficiency-details [proficiencyIndex]="selectedProficiency.index"/>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './list-with-detail.component.css'
})
export class ProficiencyListWithDetailComponent {
  @Input() proficienciesList: any[] | undefined = [];
  selectedProficiency: any | undefined;


  constructor(private api: ApiService) {}

  proficiencyDetails(proficiency: Proficiencies): void {
    this.selectedProficiency = proficiency;
  }
}
