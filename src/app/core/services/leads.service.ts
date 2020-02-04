import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { retry, catchError } from 'rxjs/operators';
import { LeadsNewRequestModel } from 'src/app/shared/models/leads.model';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;

  constructor(
    private http: HttpClient,
    private generalService: GeneralService,
   // private authService: AuthenticationService
  ) { }

  PostRequirement(RFQModel: LeadsNewRequestModel) {
    return this.http.post(this.apiUrl + 'Leads', RFQModel).pipe(
      catchError(this.handleError)
    );
  }

}
