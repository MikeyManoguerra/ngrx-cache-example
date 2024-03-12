import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { EXAMPLE_COLOR_RESPONSE } from '../models/color';
import { buildIcon } from '../models/icon';

// This is a Mocked API service.
// The goal is to simulate http requests without the overhead of actually setting up a webserver

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }
  get<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    if (url === 'colors') {
      return this.asynchronous<T>(() => EXAMPLE_COLOR_RESPONSE as T);
    }

    if (url === 'icon') {
      return this.asynchronous<T>(() => buildIcon() as T);
    }

    // in a real world situation, this would compare store updated at to DB updated at for resource
    if (url === 'icon/preflight') {
      const expired = Math.floor(Math.random() * 3) === 0; // 1 in 3 probability
      return this.asynchronous<T>(() => ({ expired }) as T);
    }

    throw new Error('404 route not found');
  }

  private asynchronous<T>(action: () => T) {
    return from(Promise.resolve(action()));
  }
}
