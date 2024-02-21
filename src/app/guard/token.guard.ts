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
        if (token === '' && token === undefined) {
          return router.parseUrl('login');
        }
        return true;
      })
    );
};
