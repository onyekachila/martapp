import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLoginProvidersComponent } from './social-login-providers.component';

describe('SocialLoginProvidersComponent', () => {
  let component: SocialLoginProvidersComponent;
  let fixture: ComponentFixture<SocialLoginProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialLoginProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
