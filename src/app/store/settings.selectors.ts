import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from './state';

export const selectSettings = createFeatureSelector<SettingsState>('settings');
export const selectNotifications = createSelector(selectSettings, ({ notificationsActive }) => notificationsActive);
export const selectAnimations = createSelector(selectSettings, ({ animationsActive }) => animationsActive);

