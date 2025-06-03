import {Component, Input, OnInit} from '@angular/core';
import {T_StartingEquipmentOptions} from '@models/class.interface';
import {I_Equipment} from '@models/equipment.interface';

@Component({
  selector: 'app-starting-equipment-option',
  imports: [],
  templateUrl: './starting-equipment-option.component.html',
  styleUrl: './starting-equipment-option.component.scss'
})
export class StartingEquipmentOptionComponent {
    @Input() starting_equipment_options: T_StartingEquipmentOptions[] = [];
}
