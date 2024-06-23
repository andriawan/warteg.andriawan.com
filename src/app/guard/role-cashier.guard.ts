import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@client/core/services/auth.service';
import { map } from 'rxjs';
import { ROLES } from '../enums/roles';

export const roleCashierGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService = inject(AuthService)

  if( authService.isLoaded && authService.currentUser.userInfo.role === ROLES.CASHIER ){
    return true
  }
  
  return authService
    .clientAuthData$()
    .pipe(
      map( authData => {
        // const isCashier = role === ROLES.CASHIER;
        if ( !authData || authData.userInfo.role === ROLES.CASHIER ) {
          console.warn(`Only ${ROLES.CASHIER} can access display menu`);
          return router.parseUrl('/');
        } else {
          return true;
        }
      })
    );
};
