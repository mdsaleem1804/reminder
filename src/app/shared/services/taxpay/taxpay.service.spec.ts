import { TestBed, inject } from '@angular/core/testing';

import { TaxpayService } from './taxpay.service';

describe('TaxpayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxpayService]
    });
  });

  it('should be created', inject([TaxpayService], (service: TaxpayService) => {
    expect(service).toBeTruthy();
  }));
});
