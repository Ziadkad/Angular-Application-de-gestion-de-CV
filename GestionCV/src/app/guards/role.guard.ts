import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const routeData = inject(ActivatedRouteSnapshot);
  if(authService.isAuthenticated){
    let requiredRoles = routeData.data['roles'];
    if(requiredRoles == authService.roles){
      return true
    }
    else{
      return false
    }
  }else{
    router.createUrlTree(['']);
    return false;
  }
};
