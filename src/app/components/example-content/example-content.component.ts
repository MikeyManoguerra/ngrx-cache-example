import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'example-content',
  standalone: true,
  imports: [IconsComponent, ButtonsComponent],
  template: `
    <div>
      <h1>NgRx Caching Examples</h1>
      <br>
      <p>This repository demonstrates three different caching schemes for use in Angular with NgRx store, named Session Cache, (Auto) Refreshing Cache, and Expiring Cache.</p>
      <br>
      <p><b>Session cache</b> is utilized by the theme colors. The  Data in the store will persist between routes, and will need to be re fetched when the page is refreshed.</p>
      <p><b>Refreshing Cache</b> is actively refreshed when the refreshAt timestamp is passed, represented by the first icon.</p>
      <p><b>Expiring Cache</b> is updated when the store data is stale. Its validity is checked on each new subscription to the store value. It is represented by the second icon.</p>
      <br>
      <p>All routes contain identical content; they exist to showcase the memoization of the data as the app creates new observables.</p>
      <br>
      <p><b>The most important/novel part of this example code are the methods IconService#getPeriodicallyRefreshingIcon, IconService#getExpiringIcon, and ColorService#getColors.</b></p>

    </div>
    <buttons />
    <icons />
    <br>
    <ul>
      <li><b>Session Cache:</b>&nbsp;Data fetched from API once, persists in store lasts for life of session.</li>
      <li><b>Auto Refreshing Cache:</b>&nbsp;Observable tracks validity of data via expiration date value, Automatically fetches new data and updates store.</li>
      <li><b>Expiring Cache:</b>&nbsp;Preflight request on creation of new observable, fetches fresh data if store data is expired.</li>
    </ul>
   `,
  styleUrl: './example-content.component.css'
})
export class ExampleContentComponent { }
