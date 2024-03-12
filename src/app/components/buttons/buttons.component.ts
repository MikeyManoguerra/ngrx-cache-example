import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { Observable } from 'rxjs';
import { Color } from '../../models/color';

@Component({
  selector: 'buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="colors$ | async  as colors">
      <button
        *ngFor="let color of colors"
        (click)="updateCurrentColor(color)"
        [ngStyle]="{'border-color': color.value}"
        >{{ color.name }}</button>
    </ng-container>
  `,
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {

  constructor(
    private colorService: ColorService,
  ) { }

  colors$: Observable<ReadonlyArray<Color>> | undefined;


  ngOnInit() {
    this.colors$ = this.colorService.getColors();

  }

  updateCurrentColor(currentColor: Color) {
    this.colorService.updateCurrentColor(currentColor);
  }
}
