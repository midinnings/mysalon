import { TestBed } from '@angular/core/testing';

import { InmessageService } from './inmessage.service';

describe('InmessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InmessageService = TestBed.get(InmessageService);
    expect(service).toBeTruthy();
  });
});
