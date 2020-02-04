import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';
import { GeneralService } from './general.service';
//import { AuthenticationService } from './authentication.service';
import { Observable, of } from 'rxjs';
import { VendorsRootObject } from 'src/app/shared/models/data.model';
import { VendorDto } from 'src/app/shared/models/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private http: HttpClient,
    private generalService: GeneralService,
   // private authService: AuthenticationService,
  ) { }

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;

  getTopStores(size: number = 8, countryId: number = 0) {
    // tslint:disable-next-line:max-line-length
    const url = `${this.apiUrl}` + 'vendors/topVendors?page=1&limit=' + `${size}` + '&Fields=id,name,description,image';    return this.http.get<VendorsRootObject>(url).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  getStoreDetail(storeGuid: string) {
    const url = `${this.apiUrl}` + "Store/" + `${storeGuid}`;
    return this.http.get<VendorDto>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  searchStores(searchString: string, size: number = 5): Observable<string[]> {
    if (!searchString.trim()) {
      // if not search string, return empty array.
      return of([]);
    }
    return this.http.get<string[]>(`${this.apiUrl}Store/Names?search=${searchString}&size=${size}`).pipe(
      catchError(this.handleError)
    );
  }

  getStores(searchString: string, page: number = 0, size: number = 10, storeGuid?: string): Observable<VendorsRootObject> {
    var url = `${this.apiUrl}Store?search=${searchString}&size=${size}&page=${page}`;
    if (storeGuid) {
      url = `${url}&storeGuid=${storeGuid}`;
    }
    return this.http.get<VendorsRootObject>(url).pipe(
      catchError(this.handleError)
    );
  }

  /*reportStore(StoreReportCreateModel: StoreReportCreateModel) {
    var url = `${this.apiUrl}Store/redflag`;
    return this.http.post(url, StoreReportCreateModel, this.authService.jsonTokenHeader()).pipe(
      catchError(this.handleError)
    );
  }*/

}
