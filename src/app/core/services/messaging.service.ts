import { Injectable, Output, EventEmitter } from '@angular/core';
import { GeneralService } from './general.service';
//import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { UserMessagePostModel, StoreMessagePostModel, ContactUsPostModel } from 'src/app/shared/models/message.model';
import { ArrayOfMessagesResponseDataModel, ArrayOfMessageContactResponseDataModel } from 'src/app/shared/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(
    private generalService: GeneralService,
   // private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;
  @Output() refreshContacts: EventEmitter<any> = new EventEmitter();

  public postMessage(model: UserMessagePostModel) {
    return this.http.post(`${this.apiUrl}user/messages`, JSON.stringify(model))
      .pipe(retry(1), catchError(this.handleError));
  }

  postMessageToStore(message: string, storeGuid: string) {
    const model: StoreMessagePostModel = {
      Target: storeGuid,
      Message: message
    };
    return this.http.post(`${this.apiUrl}user/messages/stores`, JSON.stringify(model))
      .pipe(retry(1), catchError(this.handleError));
  }

  public getMessageDetail(id: number, language: string = undefined) {
    return this.http.get<any>(`${this.apiUrl}user/messages/${id}?lang=${language}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // tslint:disable-next-line:max-line-length
  public getMessageList(senderId, receiverId, page: number = 0, size: number = 20, sort: string = 'asc', language?: string, fromTime?: any, toTime?: any) {
    return this.http.get<ArrayOfMessagesResponseDataModel>(`${this.apiUrl}user/messages?senderid=${senderId}&receiverId=${receiverId}&page=${page}&size=${size}&sort=${sort}&toTime=${toTime}&fromTime=${fromTime}&lang=${language}`)
      .pipe(retry(2),
        catchError(this.handleError)
      );
  }

  public getMessageContactList(page: number = 0, size: number = 20) {
    return this.http.get<ArrayOfMessageContactResponseDataModel>(`${this.apiUrl}user/messages/contacts?page=${page}&size=${size}`)
      .pipe(retry(2),
        catchError(this.handleError)
      );
  }

  public contactUs(data: ContactUsPostModel) {
    return this.http.post(`${this.apiUrl}notifications/contact-us`, data).pipe(
      catchError(this.handleError)
    );
  }
}
