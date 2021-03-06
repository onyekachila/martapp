import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGuidesComponent } from './video-guides.component';

describe('VideoGuidesComponent', () => {
  let component: VideoGuidesComponent;
  let fixture: ComponentFixture<VideoGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
