import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUpdateComponent } from './manager-update.component';

describe('ManagerUpdateComponent', () => {
  let component: ManagerUpdateComponent;
  let fixture: ComponentFixture<ManagerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
