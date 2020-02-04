import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageCategoryCardComponent } from './home-page-category-card.component';

describe('HomePageCategoryCardComponent', () => {
  let component: HomePageCategoryCardComponent;
  let fixture: ComponentFixture<HomePageCategoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageCategoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
