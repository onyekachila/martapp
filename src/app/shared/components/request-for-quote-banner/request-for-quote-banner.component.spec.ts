import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForQuoteBannerComponent } from './request-for-quote-banner.component';

describe('RequestForQuoteBannerComponent', () => {
  let component: RequestForQuoteBannerComponent;
  let fixture: ComponentFixture<RequestForQuoteBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForQuoteBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForQuoteBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
