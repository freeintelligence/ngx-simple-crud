import { TestBed } from '@angular/core/testing';

import { NgxSimpleCrudService } from './ngx-simple-crud.service';

describe('NgxSimpleCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSimpleCrudService = TestBed.get(NgxSimpleCrudService);
    expect(service).toBeTruthy();
  });
});
