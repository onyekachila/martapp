import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSupplierComponent } from './message-supplier.component';

describe('MessageSupplierComponent', () => {
  let component: MessageSupplierComponent;
  let fixture: ComponentFixture<MessageSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
