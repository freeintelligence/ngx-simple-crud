import { TestBed } from '@angular/core/testing';

import { ManagerReadService } from './manager-read.service';

describe('ManagerReadService', () => {
  let service: ManagerReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
