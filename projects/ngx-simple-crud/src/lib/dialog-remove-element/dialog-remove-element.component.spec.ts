import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemoveElementComponent } from './dialog-remove-element.component';

describe('DialogRemoveElementComponent', () => {
  let component: DialogRemoveElementComponent;
  let fixture: ComponentFixture<DialogRemoveElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRemoveElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemoveElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
