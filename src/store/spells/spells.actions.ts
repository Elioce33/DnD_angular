import {createActionGroup, emptyProps, props} from "@ngrx/store";
import { Spell } from "../../models/spells.interface";
import {Pagination} from '../../models/api.interfaces';

export const spellsActions = createActionGroup({
  source: 'Spell',
  events: {
    'Load Spells': emptyProps(),
    'Load Spells From References': props<Pagination>(),
    'Load Spells Success': props<{spells: Spell[]}>(),
    'Load Spells Faillure': props<{error: any}>(),
  }
});
