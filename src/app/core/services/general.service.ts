import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ResponseCodesModel } from './utility.service';

import { TenantService } from './tenant.service';
import { AppSettings } from 'src/app/configs/app-settings.config';



@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  // @Output() openSideNav: EventEmitter<any> = new EventEmitter();
  // @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  public apiUrl: string;
  public windowpageYOffset: EventEmitter<number> = new EventEmitter();

  constructor(private tenantService: TenantService) {
    this.apiUrl = this.tenantService.setInitialUrl(AppSettings.apiUrl);
   }

  public handleError(error: HttpErrorResponse) {
    let message;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      message = error.error.message;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: `, error.error);
      try {
        if (error) {
          if (error.error) {
            if (error.error.Messages) {
              message = error.error.Messages.join('\n');
              if (message + '' === 'Authorization has been denied for this request.') {
                console.log('invalid token');
                // return Observable.throw(this.refreshUserToken());
              }
            } else {
              // tslint:disable-next-line:variable-name
              let error_code = error.error;
              // console.log(error_code);
              const errorResponses: ResponseCodesModel[] = JSON.parse(localStorage.afrimartErrorResponses);
              // console.log(errorResponses);
              if (errorResponses) {
                if (error_code.error_description) {
                  error_code = error_code.error_description;
                }
                Object.keys(errorResponses).forEach(key => {
                  if ((key + '').trim() === (error_code + '').trim()) {
                    // console.log(key)
                    message = errorResponses[key];
                  }
                });
                // console.log(message);
                if (error_code + '' === "10005") {
                  // return Observable.throw(this.refreshUserToken());
                }
              }
            }

          } else if (error.message) {
            message = error.message;
            // console.log(message);
          } else {
            if (message) { } else {
              message = "An error occured!";
            }
          }
        }
      } catch (error) {
        message = "An error occured!";
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      message || 'Something bad happened; please try again later.');
  };

}
