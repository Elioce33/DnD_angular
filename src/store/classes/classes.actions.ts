import {createActionGroup, emptyProps, props} from "@ngrx/store";
import { ClassDetailsInterface } from "../../models/class-details.interface";

export const classesActions = createActionGroup({
  source: 'Classe',
  events: {
    'Load Classes': emptyProps(),
    'Load Classes Success': props<{classes: ClassDetailsInterface[]}>(),
    'Load Classes Faillure': props<{error: any}>(),
  }
});
