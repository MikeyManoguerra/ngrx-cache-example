import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ColorState } from './state';

const selectColors = createFeatureSelector<ColorState>('colors');

export const themeColors = createSelector(selectColors, ({ themeColors }) => themeColors);
export const currentColor = createSelector(selectColors, ({ currentColor }) => currentColor);
