import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isAuthenticated) {
    return true;
  } else {
    router.navigate(
      ['']
    );
    return false;
  }
};
