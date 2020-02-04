import { Component, OnInit } from '@angular/core';
import { StoreInvoiceViewModel } from 'src/app/shared/models/invoice.model';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  receivedInvoices: StoreInvoiceViewModel[];
  failedToFetchInvoices: boolean = false;

  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getReceivedInvoices(0);
  }

  getReceivedInvoices(page: number = 0) {
    this.failedToFetchInvoices = false;
    this.invoiceService.getReceivedInvoices(page).subscribe(data => {
      if (page === 0) {
        this.receivedInvoices = [];
      }
      // console.log(data);
     /* data.Data.forEach((invoice: StoreInvoiceViewModel) => {
        this.receivedInvoices.push(invoice)
      });
      if (data.Count > this.receivedInvoices.length) {
        this.getReceivedInvoices(page++);
      } else {
      }*/
    }, error => {
      this.failedToFetchInvoices = true;
    });
  }

  getTotalAmount(invoice: StoreInvoiceViewModel) {
    var totalAmount: number = 0
    if (invoice.Products) {
      invoice.Products.forEach(product => {
        totalAmount = totalAmount + (product.Price * product.Quantity);
      });
    }
    return totalAmount;
  }

}
