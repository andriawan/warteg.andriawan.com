import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs';
import { ROLES } from '../enums/roles';

export const roleCashierGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  return inject(AuthService)
    .getRole()
    .pipe(
      map(role => {
        const isCashier = role === ROLES.CASHIER;
        if (!isCashier) {
          console.warn(`Only ${ROLES.CASHIER} can access display menu`);
          return router.parseUrl('/');
        } else {
          return isCashier;
        }
      })
    );
};
