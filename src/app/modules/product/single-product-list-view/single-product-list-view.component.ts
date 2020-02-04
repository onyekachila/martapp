import { Component, OnInit, Input } from '@angular/core';
import {  ProductDto } from 'src/app/shared/models/product.model';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { UserService } from 'src/app/core/services/user.service';
import { RequestForQuoteComponent } from 'src/app/shared/components/request-for-quote/request-for-quote.component';
import { MessageSupplierComponent } from '../../business/message-supplier/message-supplier.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-single-product-list-view',
  templateUrl: './single-product-list-view.component.html',
  styleUrls: ['./single-product-list-view.component.css']
})
export class SingleProductListViewComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input("product") product: ProductDto;
  isUserLoggedIn = false;
  processing: boolean = false;
  bsModalRef: BsModalRef;

  constructor(
    private userService: UserService,
    public wishlistService: WishlistService,
    private modalService: BsModalService) { }

  ngOnInit() {
    const dis = this;
    dis.isUserLoggedIn = dis.userService.checkIfUser();
    setInterval(() => {
      dis.isUserLoggedIn = dis.userService.checkIfUser();
    }, 5000);
  }

  openRequestForQuoteDialog(product: ProductDto) {
    const initialState = {
      product
    };
    this.bsModalRef = this.modalService.show(RequestForQuoteComponent, { initialState });
  }

  openMessageSupplierDialog() {
    const initialState = {
      store: {
      //  Name: this.product.Store.Name,
     //   StoreGuid: this.product.Store.StoreGuid
      }
    };
    this.bsModalRef = this.modalService.show(MessageSupplierComponent, { initialState });
  }

}
