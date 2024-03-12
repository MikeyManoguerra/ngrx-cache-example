import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FirstPageComponent } from './pages/first-page/first-page.component';
import { SecondPageComponent } from './pages/second-page/second-page.component';

export const routes: Routes = [
  { title: 'NgRx Cache | Home', path: '', component: HomePageComponent },
  { title: 'NgRx Cache | First', path: 'first', component: FirstPageComponent },
  { title: 'NgRx Cache | Second', path: 'second', component: SecondPageComponent },
];
