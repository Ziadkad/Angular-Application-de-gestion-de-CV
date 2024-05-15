import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
    let requiredRoles = route.data['roles'][0];
    if(requiredRoles == authService.roles){
      return true
    }
    else{
      return false
    }
};
