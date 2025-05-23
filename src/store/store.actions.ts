import {createActionGroup, emptyProps, props} from "@ngrx/store";
import { Spell } from "../models/spells.interface";

export const spellsActions = createActionGroup({
  source: 'Spell',
  events: {
    'Load Spells': emptyProps(),
    'Load Spells Success': props<{spells: Spell[]}>(),
    'Load Spells Faillure': props<{error: any}>(),
  }
})
