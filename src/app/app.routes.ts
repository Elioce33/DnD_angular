import { Routes } from '@angular/router';
import {ClassesComponent} from './classes/classes.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {EquipmentsComponent} from './equipments/equipments.component';
import {SpellsComponent} from './spells/spells.component';

export const routes: Routes = [
  { path : '', component: HomeComponent },
  { path : 'classes', component: ClassesComponent },
  { path : 'equipments', component: EquipmentsComponent },
  { path : 'spells', component: SpellsComponent },
  { path : 'about', component: AboutComponent },
];
