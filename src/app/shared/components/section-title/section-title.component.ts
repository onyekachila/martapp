import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.css']
})
export class SectionTitleComponent implements OnInit {

  @Input('title') title: string = 'Section';
  @Input('title-color') titleColor: string;

  constructor() { }

  ngOnInit() {
  }

}
