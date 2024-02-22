import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs';

export const loggedInGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  return inject(AuthService)
    .getToken()
    .pipe(
      map(token => {
        const hasToken: boolean = token !== '' && token !== undefined;
        if (hasToken) {
          console.warn('Already logged in. Redirect to Display');
          return router.parseUrl('display');
        } else {
          return true;
        }
      })
    );
};
