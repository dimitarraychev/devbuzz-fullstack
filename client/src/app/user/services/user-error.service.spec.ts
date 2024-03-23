import { TestBed } from '@angular/core/testing';

import { UserErrorService } from './user-error.service';

describe('UserErrorService', () => {
  let service: UserErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
