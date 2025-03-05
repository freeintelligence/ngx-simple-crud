import { TestBed } from '@angular/core/testing';

import { ManagerCreateService } from './manager-create.service';

describe('ManagerCreateService', () => {
  let service: ManagerCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
