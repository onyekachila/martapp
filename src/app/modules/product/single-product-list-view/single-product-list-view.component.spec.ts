import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductListViewComponent } from './single-product-list-view.component';

describe('SingleProductListViewComponent', () => {
  let component: SingleProductListViewComponent;
  let fixture: ComponentFixture<SingleProductListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleProductListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProductListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
