import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemButtonComponent } from './item-button.component';

describe('ItemButtonComponent', () => {
  let component: ItemButtonComponent;
  let fixture: ComponentFixture<ItemButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
