import {Component, Input} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-proficiency-details',
  imports: [],
  template: `
    <div>
      <h4>{{this.proficiencyDetails.name}} details :</h4>
      <p>type : {{this.proficiencyDetails.type}}</p>
      <div>
        <span>{{this.proficiencyDetails.type}} list : </span>
        <ul>
          @for (reference of this.referenceList; track reference.index) {
            <li>{{reference.name}}</li>
          }
        </ul>
      </div>
    </div>
  `,
  styleUrl: './proficiency-details.component.css'
})
export class ProficiencyDetailsComponent {
  @Input() proficiencyIndex!: string;
  proficiencyDetails : any;
  referenceList: any;

  constructor(private api: ApiService) {}

  ngOnChanges(): void {
    if(this.proficiencyIndex) {
      this.api.getProficienciesDetails(this.proficiencyIndex).subscribe(response => {
        this.proficiencyDetails = response;

        this.api.get<any>(this.proficiencyDetails.reference.url).subscribe(response => {
          console.log(response);

          this.referenceList = response.equipment;
        });
        console.log(this.proficiencyDetails);
      });
    }
  }

}
