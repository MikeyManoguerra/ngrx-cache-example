import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsActions } from '../store/settings.actions';
import { selectAnimations, selectNotifications } from '../store/settings.selectors';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private store: Store) { }

  getNotificationsActive() {
    return this.store.select(selectNotifications);
  }

  toggleNotificationsActive(notificationsActive: boolean) {
    this.store.dispatch(SettingsActions.toggleNotifications({ notificationsActive }));
  }

  getAnimationsActive() {
    return this.store.select(selectAnimations);
  }

  toggleAnimationsActive(animationsActive: boolean) {
    this.store.dispatch(SettingsActions.toggleAnimations({ animationsActive }));
  }
}
