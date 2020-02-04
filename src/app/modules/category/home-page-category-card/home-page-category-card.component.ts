import { Component, OnInit, Input } from '@angular/core';
import { CategoryDto } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-home-page-category-card',
  templateUrl: './home-page-category-card.component.html',
  styleUrls: ['./home-page-category-card.component.css']
})
export class HomePageCategoryCardComponent implements OnInit {
  screenWidth = window.screen.availWidth;


  // tslint:disable-next-line:no-input-rename
  @Input("category") category: CategoryDto;

  constructor() { }

  ngOnInit() {
  }

  checkStyles() {
    if (this.screenWidth >= 1200) {

    }
  }



}
