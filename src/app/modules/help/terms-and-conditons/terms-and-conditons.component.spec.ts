import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditonsComponent } from './terms-and-conditons.component';

describe('TermsAndConditonsComponent', () => {
  let component: TermsAndConditonsComponent;
  let fixture: ComponentFixture<TermsAndConditonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsAndConditonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndConditonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
