import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerReadComponent } from './manager-read.component';

describe('ManagerReadComponent', () => {
  let component: ManagerReadComponent;
  let fixture: ComponentFixture<ManagerReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerReadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
