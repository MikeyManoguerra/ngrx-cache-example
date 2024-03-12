import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from './settings.actions';
import { SettingsState } from './state';

export const initialState: SettingsState = {
  notificationsActive: true,
  animationsActive: true,
};

export const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.toggleNotifications, (state, { notificationsActive }) => ({ ...state, notificationsActive })),
  on(SettingsActions.toggleAnimations, (state, { animationsActive }) => ({ ...state, animationsActive })),
);
