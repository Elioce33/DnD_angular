import {createActionGroup, emptyProps, props} from "@ngrx/store";
import { IClass } from "../../models/IClass";

export const classesActions = createActionGroup({
  source: 'Classe',
  events: {
    'Load Classes': emptyProps(),
    'Load Classes Success': props<{classes: IClass[]}>(),
    'Load Classes Faillure': props<{error: any}>(),
  }
});
