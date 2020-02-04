import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { VendorDto, StoreSummaryViewModel } from 'src/app/shared/models/store.model';
import { ReportStoreComponent } from '../../business/report-store/report-store.component';
import { ProductDto } from 'src/app/shared/models/product.model';
import { ReportProductComponent } from '../report-product/report-product.component';
import { BuyNowComponent } from '../buy-now/buy-now.component';
import { MessageSupplierComponent } from '../../business/message-supplier/message-supplier.component';
import { RequestForQuoteComponent } from 'src/app/shared/components/request-for-quote/request-for-quote.component';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  recommendedProduct: ProductDto[];
  product: ProductDto;
  store: StoreSummaryViewModel;
  selectedImage: string;
  bsModalRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public wishlistService: WishlistService,
    private modalService: BsModalService,
    public router: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.route.params.subscribe(() => {
      this.getProductDetail();
      // this.dialog.closeAll();
    });
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
    if (localStorage.afrimartRecommendedProducts) {
      this.recommendedProduct = JSON.parse(localStorage.afrimartRecommendedProducts).Data;
    }
  }

  getProductDetail(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = undefined;
    this.productService.getProductDetail(id)
      .subscribe(product => {
       // this.product = product;
       // this.store = this.product.Store;
        //if (this.product.ProductImages && this.product.ProductImages.length > 0) {
       // } else {
         // this.product.ProductImages = [{ ImageUrl: '../../../assets/images/default.png', ImageFile: '' }]
       // }
       // this.selectedImage = this.product.ProductImages[0].ImageUrl;
      });

    this.productService.getSimillarProducts(id).subscribe(data => {
     // if (data.Data.length > 0) { this.recommendedProduct = data.Data; }
    });
  }

  openRequestForQuoteDialog(product: ProductDto) {
    const initialState = {
      product
    };
    this.bsModalRef = this.modalService.show(RequestForQuoteComponent, { initialState });
  }

  openMessageSupplierDialog() {
    const initialState = {
      store: this.store
    };
    this.bsModalRef = this.modalService.show(MessageSupplierComponent, { initialState });
  }

  // openProductImagesDialog() {
  //   this.dialog.open(ProductImagesComponent, {
  //     width: '800px',
  //     data: this.product.ProductImages,
  //   });
  // }

  openReportProductDialog(product: ProductDto) {
    const initialState = {
      product
    };
    this.bsModalRef = this.modalService.show(ReportProductComponent, { initialState });
  }

  openReportStoreDialog(store: VendorDto) {
    const initialState = {
      store
    };
    this.bsModalRef = this.modalService.show(ReportStoreComponent, { initialState });
  }

  openBuyNowDialog(product: ProductDto) {
    const initialState = {
      product
    };
    this.bsModalRef = this.modalService.show(BuyNowComponent, { initialState });
  }

}
