import {apiObjectReference} from '../api.interfaces';

export interface ClassDetailsInterface extends apiObjectReference {
  hit_die: number;
  spells: string,
  class_levels : string,
  updated_at: Date,
  proficiency_choices: ProficiencyChoices[],
  proficiencies: Proficiencies[]
  saving_throws: SavingThrows[]
  starting_equipment: StartingEquipment[]
  starting_equipment_options: StartingEquipmentOptions[]
  multi_classing: MultiClassing
  subclasses: apiObjectReference[],
  spellcasting: Spellcasting
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
  item: apiObjectReference
}

export interface Proficiencies extends apiObjectReference {}

interface SavingThrows extends apiObjectReference {}

interface StartingEquipment {
  equipment: apiObjectReference,
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
  equipment_category: apiObjectReference,
}

interface StartingEquipmentOptionsFromOption {
  option_type: "counted_reference",
  count: number,
  of: apiObjectReference
  prerequisites?: { type: string, proficiency: apiObjectReference }[]
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
      equipment_category: apiObjectReference
    }
  }
}

interface MultiClassing {
  prerequisites: {
    ability_score: apiObjectReference,
    minimum_score: number
  }[],
  proficiencies: apiObjectReference[]
}

export interface Spellcasting {
  level: number,
  spellcasting_ability: apiObjectReference,
  info: {
    name: string,
    desc: string[]
  }[]
}
