import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Icon } from '../models/icon';
import { Subject, finalize, map, of, switchMap, take, takeUntil, tap, timer, withLatestFrom } from 'rxjs';
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

  // This workflow makes a preflight request to the server
  // to check if currently cached data is expired via an updatedAt param
  // before directly requesting new data, which may require more expensive computation
  getExpiringIcon() {
    return this.isIconExpired().pipe(
      tap((isIconExpired) => {
        console.log(isIconExpired, 'public');

        if (!isIconExpired) {
          return;
        }

        this.fetchIcon('expiringIcon').pipe(take(1)).subscribe();
      }),
      switchMap(() => this.store.select(expiringIcon)),
    );
  }

  // This workflow timer set based upon a key on the data resource.
  // The conclusion of the timer triggers a refresh of the data from the server.
  getPeriodicallyRefreshingIcon() {
    const killTimer$ = new Subject<void>();
    let notify = true;

    return this.store.select(refreshingIcon).pipe(
      tap(() => {
        if (notify) this.toast.notify('Cached refreshing icon valid.');
        notify = false;
      }),
      tap(({ refreshAt }) => {
       this.refreshTimer(refreshAt, killTimer$);
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
    // TODO check if icon is in store first
    return this.store.select(expiringIcon).pipe(
      switchMap(expiringIcon => {
        if (!expiringIcon) return of({ expired: true });

        return this.api.get<{ expired: boolean }>('icon/preflight', { updatedAt: expiringIcon.updatedAt })
      }),
      map(({ expired }) => expired),
      tap(expired => {
        console.log(expired, 'private');

        const message = expired ? 'Cached expiring icon invalid. Fetching new icon.' : 'Cached expiring icon valid per API.';
        this.toast.notify(message);
      }),
      take(1), // we switch to a new observable so this one can complete
    );
  }

  private refreshTimer(refreshAt: Date, killTimer$: Subject<void>){
    // TODO when icon undefined?
    const timeUntilExpiration = Math.max(0, refreshAt.getTime() - Date.now());

    // Note: Creating inner observable inside tap() doesnt complete when the outer observable completes,
    // multiple timers will get instaniated and trigger outer observable, creating a tighter loop as app usage continues
    // each instance of outer observable will have its own killTimer$ subject, hence killTimer$ definition inside method
    timer(timeUntilExpiration).pipe(
      switchMap(() => this.fetchIcon('refreshingIcon')),
      take(1),
      takeUntil(killTimer$),
      tap(() => this.toast.notify('Timer complete. Fetching new refreshing icon.')),
    ).subscribe();
  }
}
