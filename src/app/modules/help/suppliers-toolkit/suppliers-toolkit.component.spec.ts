import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersToolkitComponent } from './suppliers-toolkit.component';

describe('SuppliersToolkitComponent', () => {
  let component: SuppliersToolkitComponent;
  let fixture: ComponentFixture<SuppliersToolkitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersToolkitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersToolkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
