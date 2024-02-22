import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const tokenGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  return inject(AuthService)
    .getToken()
    .pipe(
      map(token => {
        const hasToken: boolean = token !== '' && token !== undefined;
        if (!hasToken) {
          console.warn('Unauthenticated User. Redirect to Login');
          return router.parseUrl('login');
        } else {
          return true;
        }
      })
    );
};
