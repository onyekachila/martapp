import { Component, OnInit, Input } from '@angular/core';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { ProductDto } from 'src/app/shared/models/product.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestForQuoteComponent } from 'src/app/shared/components/request-for-quote/request-for-quote.component';
import { MessageSupplierComponent } from '../../business/message-supplier/message-supplier.component';

@Component({
  selector: 'app-single-product-card',
  templateUrl: './single-product-card.component.html',
  styleUrls: ['./single-product-card.component.css']
})
export class SingleProductCardComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('product') product: ProductDto;
  processing: boolean = false;
  @Input("showActions") showActions: boolean;
  bsModalRef: BsModalRef;

  constructor(
    public wishlistService: WishlistService,
    private modalService: BsModalService) { }


  ngOnInit() {
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
      //  StoreGuid: this.product.Store.StoreGuid
      }
    };
    this.bsModalRef = this.modalService.show(MessageSupplierComponent, { initialState });
  }


}
