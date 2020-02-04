import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from '../shared/pipes/pipes.module';
import { SingleProductCardComponent } from './product/single-product-card/single-product-card.component';
import { WishlistComponent } from './product/wishlist/wishlist.component';
import { MessageSupplierComponent } from './business/message-supplier/message-supplier.component';
import { HomePageCategoryCardComponent } from './category/home-page-category-card/home-page-category-card.component';
import { SingleStoreCardComponent } from './business/single-store-card/single-store-card.component';
import { StoreProductsComponent } from './business/store-products/store-products.component';
import { ReportStoreComponent } from './business/report-store/report-store.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AllCategoriesComponent } from './category/all-categories/all-categories.component';
import { CategoryProductsComponent } from './category/category-products/category-products.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { ReportProductComponent } from './product/report-product/report-product.component';
import { TopProductsComponent } from './product/top-products/top-products.component';
import { BuyNowComponent } from './product/buy-now/buy-now.component';
import { ProductListCardComponent } from './product/product-list-card/product-list-card.component';
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { SingleProductListViewComponent } from './product/single-product-list-view/single-product-list-view.component';
import { ProductSearchComponent } from './product/product-search/product-search.component';
import { StoreSearchComponent } from './business/store-search/store-search.component';
import { SearchComponent } from './search/search.component';
import { ViewInvoiceComponent } from './invoice/view-invoice/view-invoice.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { MessageComponent } from './message/message.component';
//import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { HowToBecomeASupplierComponent } from './how-to-become-a-supplier/how-to-become-a-supplier.component';
import { ProfileComponent } from './profile/profile.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ViewCartComponent } from './cart/view-cart/view-cart.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AuthModule } from './auth/auth.module';
import { HelpModule } from './help/help.module';
import { ToastrModule } from 'ngx-toastr';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CarouselModule.forRoot(), TabsModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    PipesModule,
    NgxImgZoomModule,
    //AngularFireMessagingModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 100000,
      positionClass: 'toast-bottom-right'
    }),
    ImageCropperModule,
    AuthModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    HelpModule
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [HomeComponent, NotFoundComponent, SingleProductCardComponent, WishlistComponent, MessageSupplierComponent, HomePageCategoryCardComponent, SingleStoreCardComponent, StoreProductsComponent, ReportStoreComponent, AllCategoriesComponent, CategoryProductsComponent, ProductViewComponent, ReportProductComponent, TopProductsComponent, BuyNowComponent, ProductListCardComponent, SingleProductListViewComponent, ProductSearchComponent, StoreSearchComponent, SearchComponent, ViewInvoiceComponent, InvoiceListComponent, MessageComponent, HowToBecomeASupplierComponent, ProfileComponent, ViewCartComponent],
  entryComponents: [WishlistComponent, ReportStoreComponent, ReportProductComponent, BuyNowComponent, MessageSupplierComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ClientModule { }
