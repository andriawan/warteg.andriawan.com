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
        if (token !== '' && token !== undefined) {
          return router.parseUrl('display');
        }
        return true;
      })
    );
};
