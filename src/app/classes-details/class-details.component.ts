import {Component, Input, input, ViewChild, ViewContainerRef} from '@angular/core';
import {ApiService} from '../api.service';
import {Proficiencies, Spellcasting} from './class-details.interface';
import {Spells} from '../spells/spells.interfaces';
import {TabComponent} from '../tab/tab.component';
import {TabItemComponent} from '../tab/tab-item.component';
import {SpellListWithDetailComponent} from './spell-list-with-detail.component';
import {NgIf} from '@angular/common';
import {ProficiencyDetailsComponent} from '../proficiency-details/proficiency-details.component';
import {ProficiencyListWithDetailComponent} from './proficiency-list-with-detail.component';

@Component({
  selector: 'app-class-details',
  imports: [
    TabComponent,
    TabItemComponent,
    SpellListWithDetailComponent,
    NgIf,
    ProficiencyDetailsComponent,
    ProficiencyListWithDetailComponent
  ],
  template: `
    <div class="classDetails">
      <h2>{{ classDetails.name }}</h2>
      <div class="levelSelector">
        <p>
          Select a level :
          @for (idx of [1, 2, 3, 4, 5, 6, 7, 8, 9]; track idx) {
            <button (click)="selectLevel(idx)">{{ idx }}</button>
          }
        </p>
        <p>Selected level : {{classLevel}}</p>
        <p>Spell casting : {{doSpell}}</p>
      </div>

      <div class="info">
        @if (classLevel) {
          <div class="container">
            <app-tab>
              <!--TODO : find a way to remove a item-->
              @if (doSpell) {
                <app-tab-item tabTitle="Spells" [templateRef]="spells_template" />
                <app-tab-item tabTitle="Equipment" [templateRef]="equipment_template" />
              } @else {
                <app-tab-item tabTitle="Equipment" [templateRef]="equipment_template"/>
              }
            </app-tab>

            <ng-template #spells_template>
              <app-spells-list-with-detail [spellList]="getSpellsByLevels(classLevel)" />
            </ng-template>
            <ng-template #equipment_template>
              <app-proficiency-list-with-details [proficienciesList]="this.classDetails.proficiencies" />
            </ng-template>
          </div>
        } @else {
            <p>Please select a level</p>
        }

      </div>
    </div>
  `,
  styleUrl: './class-details.component.css'
})
export class ClassDetailsComponent {
  @Input() classIndex!: string;

  classDetails: any = {};

  selectedProficiency: Proficiencies | undefined;
  spellList: any[] | undefined;
  // selectedSpell: Spells | undefined;
  classLevel: number | 0 = 1;
  doSpell: boolean = false;

  constructor(private api: ApiService) {}

  ngOnChanges(): void {
    if(this.classIndex) {
      this.api.getClassesDetails(this.classIndex).subscribe(response => {
        this.classDetails = response;

        if(this.classDetails.spells) {
          this.doSpell = true;
          this.api.get<any>(this.classDetails.spells).subscribe(response => {
            this.spellList = response.results;
          });
        } else {
          this.doSpell = false;
        }
      });
    }
  }

  selectLevel(level: number) {
    this.classLevel = level;
  }

  getSpellsByLevels(level: number): any[] {
    if(level < 1) return [];
    if(!this.spellList) return [];
    return this.spellList.filter(spell => spell.level === level);
  }



}
