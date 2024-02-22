import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleCashierGuard } from './role-cashier.guard';

describe('roleCashierGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roleCashierGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
