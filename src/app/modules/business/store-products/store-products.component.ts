import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { VendorDto } from 'src/app/shared/models/store.model';
import { ProductDto } from 'src/app/shared/models/product.model';
import { MessageSupplierComponent } from '../message-supplier/message-supplier.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReportStoreComponent } from '../report-store/report-store.component';
import { AppSettings } from 'src/app/configs/app-settings.config';


@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.css']
})
export class StoreProductsComponent implements OnInit {

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private modalService: BsModalService
  ) {
    // const dis = this;
    // When the user scrolls the page, execute myFunction
    // window.onscroll = function () { dis.makeStickyFunction() };
  }

  store: VendorDto;
  products: ProductDto[];
  pageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 12,
    previousPageIndex: null
  };
  bsModalRef: BsModalRef;
  fetchingProducts: boolean;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(() => {
      this.getStoreDetail();
      this.getStoreProducts();
    });
  }

  getStoreDetail() {
    this.store = undefined;
    const id = this.route.snapshot.paramMap.get('storeId');
    this.storeService.getStoreDetail(id).subscribe(
     /* (store: StoreViewModel) => {
        this.store = store;
        this.store.MicrositeSlug = AppSettings.micrositeUrl + this.store.MicrositeSlug;
      }*/
    );
  }

  openMessageSupplierDialog() {
    const initialState = {
      store: {
        Name: this.store.name,
        StoreGuid: this.store.StoreGuid
      }
    };
    this.bsModalRef = this.modalService.show(MessageSupplierComponent, { initialState })
  }

  getStoreProducts() {
    const storeId = this.route.snapshot.paramMap.get('storeId');
    if (!this.fetchingProducts) {
      this.fetchingProducts = true;
      this.productService.getStoreProducts(storeId, this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(
        storeProducts => {
          if (!this.products) {
            this.products = [];
          }
         /* storeProducts.Data.forEach(prod => {
            this.products.push(prod);
          });

          this.pageEvent.length = storeProducts.Count;
          this.pageEvent.pageIndex = storeProducts.Page;
          this.pageEvent.pageSize = storeProducts.Size;
          this.fetchingProducts = false;*/

        }, () => {
          this.fetchingProducts = false;
        }
      );
    }

  }

  loadMoreProducts(setPageSizeOptionsInput) {
    this.pageEvent = setPageSizeOptionsInput;
    this.getStoreProducts();
  }

  fetchMoreProducts() {
    this.pageEvent.previousPageIndex = this.pageEvent.pageIndex;
    this.pageEvent.pageIndex = this.pageEvent.pageIndex + 1;
    this.getStoreProducts();
  }


  openReportStoreDialog(Store: VendorDto) {
    const initialState = {
      store: {
        Name: Store.name,
        StoreGuid: Store.StoreGuid
      }
    };
    this.bsModalRef = this.modalService.show(ReportStoreComponent, { initialState })
  }

  scrollTo(id: string) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }

}
