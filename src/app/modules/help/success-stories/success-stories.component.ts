import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.css']
})
export class SuccessStoriesComponent implements OnInit {

  successStories: any[] = [];
  WriteUps: any[] = [];

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

}
