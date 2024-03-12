import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octMarkGithub } from '@ng-icons/octicons'

@Component({
  selector: 'the-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent],
  viewProviders: [provideIcons({ octMarkGithub })],
  template: `
    <header>
      <div class="header-inner">
        <nav>
          <ul>
            <li><a routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" routerLink="/">Home</a></li>
            <li><a routerLinkActive="active" routerLink="/first">
              <span>One</span>
              <span>First</span>
            </a></li>
            <li><a routerLinkActive="active" routerLink="/second">
              <span>Two</span>
              <span>Second</span>
            </a></li>
          </ul>
        </nav>
        <div class="controls">
          <div>
            <label for="notifications">
              <span>Notif</span>
              <span>Notifications</span>
            </label>
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              (change)="toggleNotifcations($event)"
              [checked]="notificationsActive$ | async"
            >
          </div>
          <div>|</div>
          <a href="https://github.com/mikeymanoguerra/ngrx-cache-example" aria-label="Github">
            <ng-icon name="octMarkGithub" alt="github-link"></ng-icon>
          </a>
        </div>
      </div>
    </header>
  `,
  styleUrl: './the-header.component.css'
})
export class TheHeaderComponent {
  notificationsActive$ = this.settingsService.getNotificationsActive();

  constructor(private settingsService: SettingsService) { }

  toggleNotifcations(event: Event) {
    const target = event.target as HTMLInputElement;
    this.settingsService.toggleNotificationsActive(target.checked);
  }
}
