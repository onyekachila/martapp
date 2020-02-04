import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
//import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { StoreInvoiceDeliveryAddressUpdateModel, StoreInvoiceViewModel } from 'src/app/shared/models/invoice.model';
import { ArrayOfInvoicesResponseDataModel } from 'src/app/shared/models/data.model';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private generalService: GeneralService,
   // private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;

  getReceivedInvoices(page: number = 0, size: number = 20) {
    return this.http.get<ArrayOfInvoicesResponseDataModel>(this.apiUrl + "invoices/buyer?size=" + size + "&page=" + page).pipe(retry(1), catchError(this.handleError));
  }

  getInvoiceDetail(InvoiceId) {
    return this.http.get<StoreInvoiceViewModel>(this.apiUrl + "Invoices/" + InvoiceId).pipe(retry(1), catchError(this.handleError));
  }

  updateInvoiceDeliveryAddess(data: StoreInvoiceDeliveryAddressUpdateModel) {
    return this.http.put(this.apiUrl + "invoices/delivery-address", data).pipe(catchError(this.handleError));
  }
}
