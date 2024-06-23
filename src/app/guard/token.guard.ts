import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@client/core/services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { isServerSide } from '@client/core/utils/helpers';

export const tokenGuard: CanActivateFn = () => {
  const router: Router = inject(Router);
  const authService = inject(AuthService)

  if( authService.isLoaded && authService.currentUser.authToken ){
    return true
  }

  if( isServerSide() ){
    return authService.serverAuthData$().pipe(
      map( response =>{
        if(response?.data ){
          return true
        }
        return router.parseUrl('login');
      })
    )
  }

  return authService
    .clientAuthData$()
    .pipe(
      map( authData => {
        if (!authData?.authToken) {
          console.warn('Unauthenticated User. Redirect to Login');
          return router.parseUrl('login');
        } else {
          return true;
        }
      })
    );
};
