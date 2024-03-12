import { createActionGroup, props } from '@ngrx/store';
import { SettingsState } from './state';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    'Toggle Notifications': props<{ notificationsActive: boolean }>(),
    'Toggle Animations': props<{ animationsActive: boolean }>(),
  },
});
