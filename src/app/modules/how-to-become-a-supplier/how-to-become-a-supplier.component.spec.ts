import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToBecomeASupplierComponent } from './how-to-become-a-supplier.component';

describe('HowToBecomeASupplierComponent', () => {
  let component: HowToBecomeASupplierComponent;
  let fixture: ComponentFixture<HowToBecomeASupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToBecomeASupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToBecomeASupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
