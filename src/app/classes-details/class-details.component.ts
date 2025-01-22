import {Component, Input, input} from '@angular/core';
import {ApiService} from '../api.service';
import {Proficiencies, Spellcasting} from './class-details.interface';
import {ProficiencyDetailsComponent} from '../proficiency-details/proficiency-details.component';

@Component({
  selector: 'app-class-details',
  imports: [
    ProficiencyDetailsComponent
  ],
  template: `
    <div class="classDetails">
      <h2>{{ classDetails.name }}</h2>
      <div class="info">
        <div class="proficiencies">
          <h3>Proficiencies</h3>
          <div>
            <ul>
              @for (proficiency of classDetails.proficiencies; track proficiency.index) {
                <li>
                  <a class="clickable" (click)="proficiencyDetails(proficiency)">{{ proficiency.name }}</a>
                </li>
              }
            </ul>
          </div>
          <div>
            @if (!selectedProficiency) {
              Select a proficiency to show more information
            } @else {
              <app-proficiency-details [proficiencyIndex]="selectedProficiency.index"/>
            }

          </div>
        </div>
        @if (classDetails.spellcasting) {
          <div class="spellcasting">
            <h3>Spell casting </h3>
            <div class="container">
              <div>
                <ul>
                  @for (spell of classDetails.spellcasting["info"]; track spell.name) {
                    <li>
                      <a class="clickable" (click)="spellDetails(spell)">{{ spell.name }}</a>
                    </li>
                  }
                </ul>
              </div>
              <div>
                @if (!selectedSpell) {
                  Select a spell to show description
                } @else {
                  {{ selectedSpell.desc.join("\\n") }}
                }
              </div>
            </div>
          </div>
        }
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
