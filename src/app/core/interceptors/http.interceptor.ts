import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthService } from '../services/auth.service';
import { isServerSide } from '../utils/helpers';

export const CustomHttpInterceptor: HttpInterceptorFn = (req, next) => {

  const user = inject(AuthService)

  console.log('TEST MIDDLEWARE')

  let customReq: any = undefined;

  if (!req.url.match(/^(http|https|\/\/)/)) {
    customReq = customReq || {};
    customReq.url = req.url.trim();
    
    customReq.url = `${ isServerSide() ? environment.ApiUrlServer() : environment.ApiUrlClient }${
      customReq.url.match(/^\//) ? customReq.url : `/${customReq.url}`
    }`;
    
    if (user.currentUser?.authToken) {
      // customReq = customReq || {}
      customReq.responseType = 'json';
      customReq.setHeaders = {
        Authorization: `Bearer ${user.currentUser?.authToken}`,
      };

      if (req.method !== 'GET') {
        // customReq.setHeaders['Content-Type'] = 'application/json; charset=UTF-8'
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }

      req.headers.keys().forEach((val) => {
        customReq.setHeaders[val] = req.headers.get(val);
      });
    }
  }

  if (customReq) {
    req = req.clone(customReq);
  }

  return next(req);
};
