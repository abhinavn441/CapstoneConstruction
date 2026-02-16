import { CanActivateFn, Router } from '@angular/router';
import { AuthComponent } from '../auth.component';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../../services/nagivation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);

  console.log(authService.isAuthenticated());
  if (authService.isAuthenticated()) {
    snackbar.open('Access Granted', 'Dismiss', {
      duration: 2000
    });
    return true;
  }
  else {
    snackbar.open('Access Denied', 'Dismiss', {
      duration: 2000
    });
    return router.createUrlTree(['/']);
  }
};


