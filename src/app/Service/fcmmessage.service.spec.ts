import { TestBed } from '@angular/core/testing';

import { FcmmessageService } from './fcmmessage.service';

describe('FcmmessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FcmmessageService = TestBed.get(FcmmessageService);
    expect(service).toBeTruthy();
  });
});
