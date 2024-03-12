import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { colorReducer } from './store/color.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { iconReducer } from './store/icon.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { settingsReducer } from './store/settings.reducer';

const reducers = {
  colors: colorReducer,
  icon: iconReducer,
  settings: settingsReducer,
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['icon', 'settings'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideAnimationsAsync(), // required animations providers for Toastr
    provideToastr({
      timeOut: 1200,
      maxOpened: 1,
      toastClass: 'ngx-toastr ngrx-cache-notify',
      iconClasses: {
        error: '',
        info: '',
        success: '',
        warning: '',
      },
      positionClass: 'toast-bottom-right',
      // autoDismiss: true,
    }),
  ],
};
