import { CanActivateFn, Router } from '@angular/router';
import { AuthComponent } from '../auth.component';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../../services/nagivation.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const navigation=inject(NavigationService);
  const router=inject(Router)
  console.log(authService.isAuthenticated());
  return authService.isAuthenticated()? true : router.createUrlTree(['/']);
};
