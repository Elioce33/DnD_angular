import {Component, Input, input} from '@angular/core';
import {ApiService} from '../../api.service';
import {Proficiencies, Spellcasting} from './class-details.interface';

@Component({
  selector: 'app-class-details',
  imports: [],
  template: `
    <div class="classDetails">
      <h2>{{ classDetails.name }}</h2>
      <div class="info">
        <i>information here</i>
      </div>
    </div>
  `,
  styleUrl: './class-details.component.css'
})
export class ClassDetailsComponent {
  @Input() classIndex!: string;
  classDetails: any = {};
  selectedSpell: {name: string, desc:string[]} | undefined;
  selectedProficiency: Proficiencies | undefined;

  constructor(private api: ApiService) {}

  ngOnChanges(): void {
    if(this.classIndex) {
      this.api.getClassesDetails(this.classIndex).subscribe(response => {
        this.classDetails = response;
        this.selectedSpell = undefined;
        this.selectedProficiency = undefined;
      });
    }
  }

  spellDetails(spellInfo: {name: string, desc:string[]}): void {
    this.selectedSpell = spellInfo;
  }

  proficiencyDetails(proficiency: Proficiencies): void {
    this.selectedProficiency = proficiency;
  }

}
