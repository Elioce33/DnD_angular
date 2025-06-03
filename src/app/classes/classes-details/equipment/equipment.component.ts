import {Component, Input} from '@angular/core';
import {I_Equipment} from '@models/equipment.interface';

@Component({
  selector: 'app-equipment',
  imports: [],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent {
    @Input() equipment: I_Equipment | undefined;
    @Input() quantity: number = 0;
}
