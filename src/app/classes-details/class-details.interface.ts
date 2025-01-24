import {ApiObjectReference} from '../api.interfaces';

export interface ClassDetailsInterface extends ApiObjectReference {
  hit_die: number;
  class_levels : string,
  updated_at: Date,
  proficiency_choices: ProficiencyChoices[],
  proficiencies: Proficiencies[]
  saving_throws: SavingThrows[]
  starting_equipment: StartingEquipment[]
  starting_equipment_options: StartingEquipmentOptions[]
  multi_classing: MultiClassing
  subclasses: ApiObjectReference[],
  spellcasting?: Spellcasting
  spells?: string,
}

interface ProficiencyChoices {
  desc: string,
  choose: number,
  type: string,
  from: ProficiencyChoicesFrom
}

interface ProficiencyChoicesFrom {
  option_set_type: string
  options: ProficiencyChoicesFromOption[]
}

interface ProficiencyChoicesFromOption {
  option_type: string,
  item: ApiObjectReference
}

export interface Proficiencies extends ApiObjectReference {}

interface SavingThrows extends ApiObjectReference {}

interface StartingEquipment {
  equipment: ApiObjectReference,
  quantity: number
}

interface StartingEquipmentOptions {
  desc: string,
  choose: number,
  type: string,
  from: StartingEquipmentOptionsFrom | StartingEquipmentOptionsFromEquipmentCategory
}

interface StartingEquipmentOptionsFrom {
  option_set_type: string | "options_array" | "equipment_category",
  options: StartingEquipmentOptionsFromOption[] | StartingEquipmentOptionsFromOptionMultiple[] | StartingEquipmentOptionsFromOptionChoice[]
}

interface StartingEquipmentOptionsFromEquipmentCategory {
  option_set_type: "equipment_category",
  equipment_category: ApiObjectReference,
}

interface StartingEquipmentOptionsFromOption {
  option_type: "counted_reference",
  count: number,
  of: ApiObjectReference
  prerequisites?: { type: string, proficiency: ApiObjectReference }[]
}

interface StartingEquipmentOptionsFromOptionMultiple {
  option_type: "multiple",
  items: StartingEquipmentOptionsFromOption[]
}

interface StartingEquipmentOptionsFromOptionChoice {
  option_type: "choice",
  choice: {
    desc: string,
    choose: number,
    type: string,
    from: {
      option_set_type: string,
      equipment_category: ApiObjectReference
    }
  }
}

interface MultiClassing {
  prerequisites: {
    ability_score: ApiObjectReference,
    minimum_score: number
  }[],
  proficiencies: ApiObjectReference[]
}

export interface Spellcasting {
  level: number,
  spellcasting_ability: ApiObjectReference,
  info: {
    name: string,
    desc: string[]
  }[]
}
