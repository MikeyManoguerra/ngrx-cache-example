import {  createActionGroup, props } from '@ngrx/store';
import { Color } from '../models/color';

export const ColorActions = createActionGroup({
  source: 'Colors',
  events: {
    'Colors Fetched': props<{ themeColors: Color[] }>(),
    'Update Current Color': props<{ currentColor: Color }>(),
  },
});
