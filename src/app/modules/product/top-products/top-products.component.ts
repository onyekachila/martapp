import { Component, OnInit } from '@angular/core';
import { ProductDto} from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.css']
})
export class TopProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
  ) { }

  Products: ProductDto[];
  pageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 10
  };

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getTopProducts();
  }

  getTopProducts() {
    this.Products = undefined;
    let countryId = 0;
    try {
      countryId = JSON.parse(localStorage.afrimartSelectedCountry).Id;
    } catch (error) {
    }
    this.productService.getTopProducts({ size: this.pageEvent.pageSize, countryId, page: this.pageEvent.pageIndex }).subscribe(
      ProductsRes => {
       /* this.Products = ProductsRes.Data;
        this.pageEvent.length = ProductsRes.Count;
        this.pageEvent.pageIndex = ProductsRes.Page;
        this.pageEvent.pageSize = ProductsRes.Size;*/
      }
    );
  }


  loadMoreProducts(setPageSizeOptionsInput: { page: number, itemsPerPage: number }) {
    this.pageEvent.pageIndex = setPageSizeOptionsInput.page;
    // this.pageEvent = setPageSizeOptionsInput;
    // this.getTopProducts();
  }


}
