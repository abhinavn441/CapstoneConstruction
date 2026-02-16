import { Component, signal } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { NavigationService } from '../services/nagivation.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-auth.component',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  logging = signal(false);
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private navigation: NavigationService,
    private notification: NotificationService
  ) {
    this.authService.logout();
  }

  onLogin(): void {
    this.logging.set(true);
    this.authService.login(this.username, this.password).pipe(
      finalize(() => this.logging.set(false))
    ).subscribe({
      next: res => {
        this.authService.saveToken(res.token);
        this.navigation.navigateToMenu();
      },
      error: () => this.notification.showError('Invalid credentials')
    });
  }
}
