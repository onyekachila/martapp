import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { LogisticsEstimateRequestModel, LogisticChannelEstimateModel } from 'src/app/shared/models/logistics.model';
import { ArrayOfLogisticsResponseDataModel } from 'src/app/shared/models/data.model';


@Injectable({
  providedIn: 'root'
})
export class LogisticsService {

  constructor(
    private http: HttpClient,
    private generalService: GeneralService,
   // private authService: AuthenticationService
  ) { }

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;

  getEstimatesFromLogisticChannels(data: LogisticsEstimateRequestModel) {
    return this.http.post<LogisticChannelEstimateModel>(this.apiUrl + "Logistics/estimates",
     data).pipe(catchError(this.handleError));
  }

  getAvailableLogisticChannels() {
    return this.http.get<ArrayOfLogisticsResponseDataModel>(this.apiUrl + "Logistics"
    ).pipe(catchError(this.handleError))
  }
}
