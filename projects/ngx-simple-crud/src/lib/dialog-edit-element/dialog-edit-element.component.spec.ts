import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditElementComponent } from './dialog-edit-element.component';

describe('DialogEditElementComponent', () => {
  let component: DialogEditElementComponent;
  let fixture: ComponentFixture<DialogEditElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
