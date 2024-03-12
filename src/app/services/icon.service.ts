import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Icon } from '../models/icon';
import { Subject, finalize, map, switchMap, take, takeUntil, tap, timer, withLatestFrom } from 'rxjs';
import { ApiService } from './api.service';
import { expiringIcon, refreshingIcon } from '../store/icon.selectors';
import { iconFetched } from '../store/icon.actions';
import { ToastService } from './toast.service';
import { IconType } from '../store/state';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private store: Store,
    private api: ApiService,
    private toast: ToastService,
  ) { }

  getExpiringIcon() {

    return this.isIconExpired().pipe(
      withLatestFrom(this.store.select(expiringIcon)),
      tap(([isIconExpired]) => {
        if (!isIconExpired) {
          return;
        }

        this.fetchIcon('expiringIcon').pipe(take(1)).subscribe();
      }),
      map(([_, icon]) => icon),
    );
  }

  getPeriodicallyRefreshingIcon() {
    const killTimer$ = new Subject<void>();
    let notify = true;

    return this.store.select(refreshingIcon).pipe(
      tap(() => {
        if (notify) this.toast.notify('Cached Refreshing icon valid');
        notify = false;
      }),
      tap(({ refreshAt }) => {
        // TODO when icon undefined?
        const timeUntilExpiration = Math.max(0, refreshAt.getTime() - Date.now());

        // Note: Creating inner observable inside tap() doesnt complete when the outer observable completes,
        // multiple timers will get instaniated and trigger outer observable, creating a tighter loop as app usage continues
        // each instance of outer observable will have its own killTimer$ subject, hence killTimer$ definition inside method
        timer(timeUntilExpiration).pipe(
          switchMap(() => this.fetchIcon('refreshingIcon')),
          take(1),
          takeUntil(killTimer$),
          tap(() => this.toast.notify('Time based icon refresh')),
        ).subscribe();
      }),
      finalize(() => {
        killTimer$.next();
        killTimer$.complete();
      }),
    );
  }

  private fetchIcon(iconType: IconType) {
    return this.api.get<Icon>('icon').pipe(tap(icon => this.store.dispatch(iconFetched({ icon, iconType }))));
  }

  private isIconExpired() {
    return this.api.get<{ expired: boolean }>('icon/preflight').pipe(
      map(({ expired }) => expired),
      tap(expired => {
        const message = expired ? 'Cached icon invalid. Fetching new Icon.' : 'Cached icon valid per API';
        this.toast.notify(message);
      }),
    );
  }
}
