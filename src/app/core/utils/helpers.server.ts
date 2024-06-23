import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Request, Response } from 'express';

export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');

export { Request }

@Injectable({
  providedIn: 'root',
})
export class DevRequest {
  constructor(
    @Optional() @Inject('__REQUEST_TOKEN_TEMP') readonly _context: Request
  ){}
}