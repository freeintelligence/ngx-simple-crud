import { TestBed } from '@angular/core/testing';

import { SimpleCrudService } from './simple-crud.service';

describe('SimpleCrudService', () => {
  let service: SimpleCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
