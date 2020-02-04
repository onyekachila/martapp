import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { StoreService } from 'src/app/core/services/store.service';
import { ProductDto } from 'src/app/shared/models/product.model';
import { VendorDto } from 'src/app/shared/models/store.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private storeService: StoreService
  ) { }

  searchString: string;
  Products: ProductDto[];
  Stores: VendorDto[];
  storePageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 20
  };
  productPageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 20
  };
  selectedCountryId: number;

  ngOnInit() {
    window.scrollTo(0, 0)
    this.route.params.subscribe(() => {
      this.searchString = this.route.snapshot.paramMap.get('searchString');
      try {
        this.selectedCountryId = JSON.parse(localStorage.afrimartSelectedCountry).Id;
      } catch (error) {
      }
      this.getSuppliers();
      this.getProducts();
    });
  }

  getSuppliers() {
    this.Stores = undefined;
    this.storeService.getStores(this.searchString, this.storePageEvent.pageIndex, this.storePageEvent.pageSize).subscribe(
      data => {
        this.Stores = data.vendors;
        this.storePageEvent.length = data.Count;
        this.storePageEvent.pageIndex = data.Page;
        this.storePageEvent.pageSize = data.Size;
      }, error => {
        this.Stores = [];
      }
    )
  }

  getProducts() {
    this.Products = undefined;
    // tslint:disable-next-line:max-line-length
    /*this.productService.getProducts(this.searchString, this.productPageEvent.pageIndex, this.productPageEvent.pageSize, this.selectedCountryId).subscribe(
      data => {
        this.Products = data.Data;
        this.productPageEvent.length = data.Count;
        this.productPageEvent.pageIndex = data.Page;
        this.productPageEvent.pageSize = data.Size;
      }, error => {
        this.Products = [];
      }
    );*/
  }


  loadMoreProducts(setPageSizeOptionsInput: { page: number }) {
    this.productPageEvent.pageIndex = setPageSizeOptionsInput.page;
    this.getProducts();
  }

  loadMoreStores(setPageSizeOptionsInput: { page: number }) {
    this.storePageEvent.pageIndex = setPageSizeOptionsInput.page;
    this.getSuppliers();
  }

}
