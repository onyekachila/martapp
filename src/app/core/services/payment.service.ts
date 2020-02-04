import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { GeneralService } from './general.service';
import { MerchantSubscriptionTypeViewModel } from 'src/app/shared/models/merchant.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient,
   // private authService: AuthenticationService,
    private generalService: GeneralService
  ) { }

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;

  getMerchantPaymentItems() {
    return this.http.get<MerchantSubscriptionTypeViewModel[]>(`${this.apiUrl}merchant/payment/items`

    )
      .pipe(
        map(res => {
          localStorage.afrimartMerchantPaymentItems = JSON.stringify(res);
          return res;
        }),
        catchError(this.handleError)
      );
  }
}
