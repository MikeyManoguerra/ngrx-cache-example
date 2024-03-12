import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IconState } from './icon.reducer';

export const selectIcon = createFeatureSelector<IconState>('icon');


export const expiringIcon = createSelector(selectIcon, ({ expiringIcon }) => expiringIcon);
export const refreshingIcon = createSelector(selectIcon, ({ refreshingIcon }) => refreshingIcon);

