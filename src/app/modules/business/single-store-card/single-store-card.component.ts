import { Component, OnInit, Input } from '@angular/core';
import { VendorDto } from 'src/app/shared/models/store.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MessageSupplierComponent } from '../message-supplier/message-supplier.component';

@Component({
  selector: 'app-single-store-card',
  templateUrl: './single-store-card.component.html',
  styleUrls: ['./single-store-card.component.css']
})
export class SingleStoreCardComponent implements OnInit {

  constructor(
    private modalService: BsModalService
  ) { }

  bsModalRef: BsModalRef
  // tslint:disable-next-line:no-input-rename
  @Input('store') store: VendorDto;

  ngOnInit() {
  }

  openMessageSupplierDialog() {
    const initialState = {
      store: {
        name: this.store.name,
        StoreGuid: this.store.StoreGuid
      }
    };
    this.bsModalRef = this.modalService.show(MessageSupplierComponent, { initialState })
  }

}
