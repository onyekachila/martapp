import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(private http: HttpClient,
              private jwtService: JwtService) { }

         private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get<T>(`${environment.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  // tslint:disable-next-line:ban-types
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
