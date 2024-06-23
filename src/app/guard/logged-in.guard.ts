import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@client/core/services/auth.service';
import { map } from 'rxjs';

export const isLoggedInGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService = inject(AuthService)

  if( authService.isLoaded && !authService.currentUser.authToken ){
    return true
  }
  return authService
    .clientAuthData$()
    .pipe(
      map( authData => {
        // console.log('data login' , token )
        // const hasToken: boolean = token !== '' && token !== undefined;
        if ( authData?.authToken ) {
          console.warn('Already logged in. Redirect to Display');
          return router.parseUrl('dashboard');
        } else {
          return true;
        }
      })
    );
};
