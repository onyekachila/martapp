import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  // tslint:disable-next-line:ban-types
  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  // tslint:disable-next-line:ban-types
  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
