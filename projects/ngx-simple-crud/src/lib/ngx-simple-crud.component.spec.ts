import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSimpleCrudComponent } from './ngx-simple-crud.component';

describe('NgxSimpleCrudComponent', () => {
  let component: NgxSimpleCrudComponent;
  let fixture: ComponentFixture<NgxSimpleCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSimpleCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSimpleCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
