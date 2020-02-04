import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleStoreCardComponent } from './single-store-card.component';

describe('SingleStoreCardComponent', () => {
  let component: SingleStoreCardComponent;
  let fixture: ComponentFixture<SingleStoreCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleStoreCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
