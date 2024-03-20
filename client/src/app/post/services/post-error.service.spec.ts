import { TestBed } from '@angular/core/testing';

import { PostErrorService } from './post-error.service';

describe('PostErrorService', () => {
  let service: PostErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
