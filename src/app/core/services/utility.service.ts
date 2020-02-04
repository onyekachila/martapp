import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
//import { AuthenticationService } from './authentication.service';
import { retry, map, catchError } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { StoreService } from './store.service';
// tslint:disable-next-line:max-line-length
import { CountryRootObject, ArrayOfCurrenciesResponseDataModel, LanguagesRootObject, IpDataModel, ArrayOfBanksResponseDataModel, CurrencyRatesModel } from 'src/app/shared/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private http: HttpClient,
    private generalService: GeneralService,
    //private authService: AuthenticationService,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private storeService: StoreService
  ) {
    //this.getResponseCodes().subscribe();
  }

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;


 /* getResponseCodes() {
    return this.http.get<ResponseCodesModel>(this.apiUrl + 'Utility/response/codes').pipe(
      map(res => {
        localStorage.afrimartErrorResponses = JSON.stringify(res); return res;
      }),
      catchError(this.handleError)
    );
  }*/

  public getCountries(page, size) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<CountryRootObject>(this.apiUrl + 'utility/countries?page=1&limit=' + `${size}` + '&Fields=id,name').pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  public getOperatingCountries(page: number = 0, size: number = 70) {
    return this.http.get<CountryRootObject>(this.apiUrl + 'utility/countries?page=1&limit=' + `${size}` + '&Fields=id,name').pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  public getCurrencies(page: number = 0, size: number = 50) {
    return this.http.get<ArrayOfCurrenciesResponseDataModel>(this.apiUrl + 'Utility/Currencies?page=' + page + '&size=' + size).pipe(
      map(res => { localStorage.currencies = JSON.stringify(res); return res; }),
      catchError(this.handleError)
    );
  }

  public switchLanguage(language: string) {
    let setlang = 'English';
    // console.log(language)
    if (language) {
      switch (language.toLocaleLowerCase()) {
        case 'en':
          setlang = 'English';
          break;
        case 'fr':
          setlang = 'French';
          break;
        case 'french':
          language = 'fr';
          break;
        case 'english':
          language = 'en';
          break;
        case 'spanish':
          language = 'sp';
          break;
        case 'afrikaans':
          language = 'af';
          break;
        case 'arabic':
          language = 'ar';
          break;
        default:
          break;
      }
      this.setPrefferedLang(language);
    }
    return setlang;
  }

  public setPrefferedLang(lang: string) {

    localStorage.prefferedLang = lang;

  }


  public getLanguages(size: number = 50, page: number = 0) {
    return this.http.get<LanguagesRootObject>(this.apiUrl + 'languages?page=1&limit=' + `${size}` + '&Fields=id,name').pipe(
      retry(3),
      map(res => { res; return res; }),
      catchError(this.handleError)
    );
  }


  public getIp(refresh: boolean = false): Promise<IpDataModel> {
    return new Promise((resolve, reject) => {
      if (!refresh) {
        if (localStorage.ipData) {
          resolve(JSON.parse(localStorage.ipData));
        } else {
          this.getIpData().then(data =>
            resolve(data)
          ).catch(err => reject(err));
        }
      } else {
        this.getIpData().then(data =>
          resolve(data)
        ).catch(err => reject(err));
      }
    });
  }

  getIpData(): Promise<IpDataModel> {
    return new Promise((resolve, reject) => {
      this.getIpAddress().subscribe(data => {
        this.getIpDataUsingIp(data.ip).subscribe(ipdata => {
          resolve(ipdata);
        }, error => reject(error));
      }, error => {
        reject(error);
      })
    })
  }


  getIpAddress() {
    return this.http.get<{ ip: string }>('https://api.ipify.org/?format=json').pipe(
      retry(3),
      catchError(this.handleError)
    );
  }


  getIpDataUsingIp(ip: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<IpDataModel>(`https://api.ipstack.com/${ip}?access_key=8f52d900e1581c0da641371ac6b613e2&output=json&language=en`).pipe(
      retry(3),
      map(res => { return res; }),
      catchError(this.handleError)
    );
  }

  public sortArrayOfObjectsByKey(array, key) {
    return array.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  public getBaseUrl() {
    var currentAbsoluteUrl = window.location.href; //full url
    var currentRelativeUrl = this.router.url; //angular router url(/login)
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl); //index of the
    var baseUrl = currentAbsoluteUrl.substring(0, index);
    return baseUrl;
  }

  getBanksPerCountry(countryId: number) {
    return this.http.get<ArrayOfBanksResponseDataModel>(`${this.apiUrl}Utility/banks/${countryId}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  search(nameKey, property, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i][property] + '' === nameKey + '') {
        return myArray[i];
      }
    }
  }

  sortItemsByDate(items) {
    return items.sort((a: any, b: any) =>
      new Date(a.TimeSent).getTime() - new Date(b.TimeSent).getTime()
    );
  }

  getAndSetCurrencyExchangeRate() {
    const d = new Date();
    let month = "" + (d.getMonth() + 1);
    if (parseInt(month) < 10) {
      month = "0" + month;
    }
    let day = "" + d.getDate();
    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    try {
      if (JSON.parse(localStorage.currencyRate).date === (d.getFullYear() + "-" + month + "-" + day)) { } else {
        this.getCurrencyExchangeRate().subscribe();
      }
    } catch (error) {
      this.getCurrencyExchangeRate().subscribe();
    }
  }

  getCurrencyExchangeRate() {
    return this.http.get<CurrencyRatesModel>(`https://openexchangerates.org/api/latest.json?app_id=9bac35c1144944dab95c78fdc07bf6e7`).pipe(
      map(res => {
        return res;
      }), catchError(this.handleError)
    );
  }


  public replaceImageDataString(imageString): string {
    if (imageString.indexOf('data:image/png;base64,') !== -1) {
      return imageString.replace('data:image/png;base64,', '');
    } else if (imageString.indexOf('data:image/jpeg;base64,') !== -1) {
      return imageString.replace('data:image/jpeg;base64,', '');
    } else {
      return '';
    }
  }

  autoCompleteSearch(searchString: string, searchObject: string = "Products"): Observable<string[]> {
    if (!searchString || searchString.trim() == '') {
      return of([]);
    }
    if (searchObject === 'Products') {
     // return this.productService.searchProducts(searchString, 10);
    }
    if (searchObject === "Categories") {
      return this.categoryService.searchCategories(searchString, 10)
    }
    if (searchObject === "Stores") {
      return this.storeService.searchStores(searchString, 10)
    }
    if (searchObject === "All") {
      let res: Observable<string[]>;
      //res = this.productService.searchProducts(searchString, 10);
      res = this.storeService.searchStores(searchString, 10)
      res = this.categoryService.searchCategories(searchString, 10);
      return res;
    }
  }


  getExchangeRate(currencyCode: string) {
    const rates: CurrencyRatesModel = JSON.parse(localStorage.currencyRate);
    return rates.rates[currencyCode];
  }

  getStringAfterCharacter(str: string, char: string) {
    return str.split(char)[1];
  }
  getMovePageUp() {
    window.scrollTo(0, 0)
  }

}

export interface ResponseCodesModel {
  key: string;
  value: string;
}
