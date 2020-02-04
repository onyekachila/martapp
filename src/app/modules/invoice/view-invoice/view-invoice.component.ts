import { Component, OnInit } from '@angular/core';
import { StoreInvoiceDeliveryAddressUpdateModel, StoreInvoiceViewModel } from 'src/app/shared/models/invoice.model';
import { LogisticsEstimateRequestModel, LogisticChannelEstimateModel } from 'src/app/shared/models/logistics.model';
import { LogisticsService } from 'src/app/core/services/logistics.service';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { CountryDto } from 'src/app/shared/models/country.model';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  InvoiceDetail: StoreInvoiceViewModel;
  fetchingInvoiceDetail = false;
  failedToFetchInvoiceDetail = false;
  AllCountries: CountryDto[];
  gettingEstimate: boolean;
  LogisticsEstimates: LogisticChannelEstimateModel;
  processing: boolean;
  getEstimateErrorMessage: string;
  makePaymentErrorMessage: string;

  constructor(
    private utilityService: UtilityService,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private logisticsService: LogisticsService
  ) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      const invoiceId = params.invoiceId;
      // this.InvoiceUpdate.InvoiceId = invoiceId;
      this.getInvoiceDetail(invoiceId);
    });
    this.getAllCountries();
  }

  payForInvoice() {
    localStorage.afrimartPreviousUrl = window.location.href;
    // tslint:disable-next-line:max-line-length
    window.location.href = this.utilityService.getBaseUrl().replace('#', '') +
     '/afrimartpay/#/invoice/' + this.InvoiceDetail.Id +
      '/' + this.LogisticsEstimates.CompanyId;
  }

  getInvoiceDetail(InvoiceId) {
    this.fetchingInvoiceDetail = true;
    this.invoiceService.getInvoiceDetail(InvoiceId).subscribe(data => {
     // this.InvoiceDetail = data;
      this.fetchingInvoiceDetail = false;
    }, error => {
    });
  }

  getTotalAmount() {
    let total = 0;
    this.InvoiceDetail.Products.forEach(product => {
      total = total + (product.Quantity * product.Price);
    });
    return total;
  }

  getAllCountries(page: number = 0) {
    this.utilityService.getCountries(page, 500).subscribe(
      data => {
        if (page === 0) {
          this.AllCountries = [];
        }
        data.countries.forEach(country => {
          this.AllCountries.push(country);
        });
        if (this.AllCountries.length > 0) {
          // this.InvoiceUpdate.ToCountryCode = this.AllCountries[0].ISOCode;
        }
        if (data.Count > this.AllCountries.length) {
          this.getAllCountries(page + 1);
        }
      }
    );
  }


  getEstimatesFromLogisticChannels() {
    const postdata: LogisticsEstimateRequestModel = {
      CompanyId: 'dhl',
      InvoiceId: this.InvoiceDetail.Id,
      ToAddress: this.InvoiceDetail.LogisticsItem.ToAddress,
      ToCity: this.InvoiceDetail.LogisticsItem.ToCity,
      ToCountryCode: this.InvoiceDetail.LogisticsItem.ToCountryCode,
      ToPostalCode: this.InvoiceDetail.LogisticsItem.ToPostalCode
    }

    if (!postdata.ToCountryCode) {
      this.getEstimateErrorMessage = 'Pls select the country you want your product to be delivered to'
    } else if (!postdata.ToCity || postdata.ToCity.trim().length === 0) {
      this.getEstimateErrorMessage = 'Pls specify the city in the selected country you want your product to be delivered to'
    } else {
      // console.log(postdata);
      this.getEstimateErrorMessage = undefined;
      this.makePaymentErrorMessage = undefined;
      this.gettingEstimate = true;
      this.LogisticsEstimates = undefined;
      this.logisticsService.getEstimatesFromLogisticChannels(postdata).subscribe(
        rdata => {
          this.gettingEstimate = false;
         // this.LogisticsEstimates = rdata;
          // console.log(rdata);
        }, error => {
          this.gettingEstimate = false;
          this.getEstimateErrorMessage = error || 'Something went wrong';
        }
      )
    }

  }

  updateLogisticsInfo() {
    this.processing = true;
    // console.log(data);
    const postdata: StoreInvoiceDeliveryAddressUpdateModel = {
      // CompanyId: "dhl",
      InvoiceId: this.InvoiceDetail.Id,
      ToAddress: this.InvoiceDetail.LogisticsItem.ToAddress,
      ToCity: this.InvoiceDetail.LogisticsItem.ToCity,
      ToCountryCode: this.InvoiceDetail.LogisticsItem.ToCountryCode,
      ToPostalCode: this.InvoiceDetail.LogisticsItem.ToPostalCode
    }
    this.makePaymentErrorMessage = undefined;
    this.invoiceService.updateInvoiceDeliveryAddess(postdata).subscribe(rdata => {
      // console.log(rdata);
      this.processing = false;
      this.payForInvoice();
    }, error => {
      // console.log(error);
      this.processing = false;
      this.makePaymentErrorMessage = error || 'Something went wrong';
    });
  }


}
