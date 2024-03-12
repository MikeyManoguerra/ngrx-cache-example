import { Component } from '@angular/core';
import { ColorService } from '../../services/color.service';
import { IconService } from '../../services/icon.service';
import { Observable } from 'rxjs';
import { ICONS, Icon } from '../../models/icon';
import { Color } from '../../models/color';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'icons',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons(ICONS)],
  template: `
    <ng-container *ngIf="(currentColor$ | async) as currentColor">
    <div class="card" [class.animate]="animationsActive$ | async">
      <ng-icon
      *ngIf="refreshingIcon$ | async as icon"
      [name]="icon.name"
      [ngStyle]="{ color: currentColor.value }"
      ></ng-icon>
      <div>
        <p>Refreshing Cache</p>
        <small>Timer triggers asset refresh.</small>
      </div>
    </div>
    <div class="card" [class.animate]="animationsActive$ | async">
      <ng-icon
      *ngIf="expiringIcon$ | async as icon"
      [name]="icon.name"
      [ngStyle]="{ color: currentColor.value }"
      ></ng-icon>
      <div>
        <p>Expiring Cache</p>
        <small>API dictates expiry for fetch.</small>
      </div>
    </div>
    <div>
      <input
        type="checkbox"
        id="animations"
        name="animations"
        (change)="toggleAnimations($event)"
        [checked]="animationsActive$ | async"
      >
      <label for="animations">Animations</label>
    </div>
    </ng-container>
  `,
  styleUrl: './icons.component.css'
})

export class IconsComponent {
  constructor(
    private colorService: ColorService,
    private iconService: IconService,
    private settingsService: SettingsService,
  ) { }

  animationsActive$ = this.settingsService.getAnimationsActive();
  refreshingIcon$ = this.iconService.getPeriodicallyRefreshingIcon();
  expiringIcon$ = this.iconService.getExpiringIcon();
  currentColor$ = this.colorService.getCurrentColor();

  toggleAnimations(event: Event) {
    const target = event.target as HTMLInputElement;
    this.settingsService.toggleAnimationsActive(target.checked);
  }
}
