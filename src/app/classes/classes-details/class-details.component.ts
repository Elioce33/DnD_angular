import {Component, Input, input} from '@angular/core';
import {ApiService} from '../../api.service';
import {Proficiencies, Spellcasting} from './class-details.interface';

@Component({
  selector: 'app-class-details',
  imports: [],
  templateUrl: './class-details.component.html',
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
