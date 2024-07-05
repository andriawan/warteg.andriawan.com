import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Request, Response } from 'express';

export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');

export { Request , Response }

@Injectable({
  providedIn: 'root',
})
export class DevContext {
  constructor(
    @Optional() @Inject('__REQUEST_TOKEN_TEMP') readonly _contextRequest: Request ,
    @Optional() @Inject('__RESPONSE_TOKEN_TEMP') readonly _contextResponse: Response ,
  ){}
}