import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { InversionService } from './inversion';

describe('InversionService', () => {
  let service: InversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(InversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
