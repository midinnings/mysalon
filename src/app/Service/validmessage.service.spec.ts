import { TestBed } from '@angular/core/testing';

import { ValidmessageService } from './validmessage.service';

describe('ValidmessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidmessageService = TestBed.get(ValidmessageService);
    expect(service).toBeTruthy();
  });
});
