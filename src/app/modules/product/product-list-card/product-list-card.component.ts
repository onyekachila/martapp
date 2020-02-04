import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProductDto } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-list-card',
  templateUrl: './product-list-card.component.html',
  styleUrls: ['./product-list-card.component.css']
})
export class ProductListCardComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (localStorage.prdLstVwStyle) {
          this.switchViewStyle(localStorage.prdLstVwStyle);
        }
      }
    })
  }

  @Input("products") products: ProductDto[];
  viewStyle: string = "list";

  ngOnInit() {
    window.scrollTo(0, 0)
  }

  switchViewStyle(viewStyle: string) {
    localStorage.prdLstVwStyle = viewStyle;
    this.viewStyle = viewStyle;
  }

}
