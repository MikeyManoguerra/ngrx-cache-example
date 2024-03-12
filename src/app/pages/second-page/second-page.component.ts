import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../layouts/default-layout/default-layout.component';
import { ExampleContentComponent } from '../../components/example-content/example-content.component';

@Component({
  selector: 'second-page',
  standalone: true,
  imports: [DefaultLayoutComponent, ExampleContentComponent],
  template: `
    <default-layout>
      <example-content></example-content>
    </default-layout>
  `,
  styles: ``
})
export class SecondPageComponent { }
