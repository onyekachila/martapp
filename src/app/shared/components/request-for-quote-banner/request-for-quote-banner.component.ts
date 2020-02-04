import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../models/product.model';
import { RequestForQuoteComponent } from '../request-for-quote/request-for-quote.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-request-for-quote-banner',
  templateUrl: './request-for-quote-banner.component.html',
  styleUrls: ['./request-for-quote-banner.component.css']
})
export class RequestForQuoteBannerComponent implements OnInit {


  product: ProductDto = {
    name: ""
  };
  bsModalRef: BsModalRef

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openRequestForQuoteDialog() {
    const initialState = {
      product: this.product
    };
    this.bsModalRef = this.modalService.show(RequestForQuoteComponent, { initialState });
  }

}
