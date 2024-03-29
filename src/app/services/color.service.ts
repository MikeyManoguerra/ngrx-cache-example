
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { Color } from '../models/color';
import { Store } from '@ngrx/store';
import { ColorActions } from '../store/color.actions';
import { currentColor, themeColors } from '../store/color.selectors';
import { ApiService } from './api.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(
    private store: Store,
    private api: ApiService,
    private toast: ToastService,
  ) { }

  // Subscribes to the data in the store.
  // Only triggers a workflow to fetch the data and place it in the store
  // if the data is not already there.
  getColors() {
    let notify = true;

    return this.store.select(themeColors).pipe(
      tap(colors => {
        if (colors.length) {
          if (notify) this.toast.notify('Use Colors from store cache.');
          return;
        }

        notify = false;
        this.fetchColors().pipe(take(1)).subscribe();
      }),
    );
  }

  getCurrentColor() {
    return this.store.select(currentColor);
  }

  updateCurrentColor(currentColor: Color) {
    this.store.dispatch(ColorActions.updateCurrentColor({ currentColor }));
  }

  private fetchColors() {
    return this.api.get<Color[]>('colors').pipe(
      tap(() => this.toast.notify('Fetch colors from API.')),
      tap(themeColors => this.store.dispatch(ColorActions.colorsFetched({ themeColors }))),
    );
  }
}
