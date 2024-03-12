import { createReducer, on } from '@ngrx/store';
import { ColorActions } from './color.actions';
import { ColorState } from './state';


export const initialState = new ColorState();

export const colorReducer = createReducer(
  initialState,
  on(ColorActions.colorsFetched, (state, { themeColors }) => ({ ...state, themeColors })),
  on(ColorActions.updateCurrentColor, (state, { currentColor }) => ({ ...state, currentColor })),
);
