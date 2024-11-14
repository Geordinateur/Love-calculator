import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { resultIdExistGuard } from './result-id-exist.guard';

describe('resultIdExistGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => resultIdExistGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
