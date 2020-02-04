import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateViaAuthGuard } from './auth.guard';

describe('CanActivateViaAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateViaAuthGuard]
    });
  });

  it('should ...', inject([CanActivateViaAuthGuard], (guard: CanActivateViaAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
