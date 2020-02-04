import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { retry, map, catchError } from 'rxjs/operators';
//import { AuthenticationService } from './authentication.service';

import { Observable, of } from 'rxjs';
import { ArrayOfProductUnitsResponseDataModel, ProductsRootObjectDto } from 'src/app/shared/models/data.model';
//import { ArrayOfProductsResponseDataModel, ProductsRootObjectDto } from '../../shared/models/data.model';
import { ProductDto } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private generalService: GeneralService,
   // private authService: AuthenticationService,
  ) { }

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;

  getTopProducts({ size = 8, countryId, page = 0 }: { size?: number; countryId?: number; page?: number; } = {}) {
    const url = `${this.apiUrl}` + 'products/topProducts?page=1&limit=' + `${size}` + '&Fields=id,name,description,images';
    return this.http.get<ProductsRootObjectDto>(url).pipe(

      catchError(this.handleError)
    );
  }

  getRecommendedProducts(size: number = 8, countryId?: number) {
    const url = `${this.apiUrl}` + 'Product/Recommended?page=0&size=' + `${size}` + "&countryId=" + `${countryId}`;
    return this.http.get<ProductsRootObjectDto>(url).pipe(

      catchError(this.handleError)
    );
  }

  getTrendingProducts(size: number = 8, countryId?: number) {
    const url = `${this.apiUrl}` + 'Product/Trending?page=0&size=' + `${size}` + "&countryId=" + `${countryId}`;
    return this.http.get<ProductsRootObjectDto>(url).pipe(

      catchError(this.handleError)
    );
  }

  getRecentlyViewedProducts(size: number = 8, countryId?: number) {
    const url = `${this.apiUrl}` + 'Product/recent?page=0&size=' + `${size}` + "&countryId=" + `${countryId}`;
    return this.http.get<ProductsRootObjectDto>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getProductDetail(id: string) {
    const url = `${this.apiUrl}` + "Product?ProductGuid=" + `${id}`;
    return this.http.get<ProductDto>(url).pipe(
      catchError(this.handleError)
    );
  }

  getProductUnits() {
    const url = `${this.apiUrl}` + 'ProductUnit';
    return this.http.get<ArrayOfProductUnitsResponseDataModel>(url).pipe(

      catchError(this.handleError)
    );
  }

  getStoreProducts(storeGuid: string, page: number = 0, size: number = 20) {
    const url = `${this.apiUrl}` + 'Product?storeGuid=' + `${storeGuid}` + "&page=" + `${page}` + "&size=" + `${size}`;
    return this.http.get<ProductsRootObjectDto>(url).pipe(
      catchError(this.handleError)
    );
  }


  getCategoryProducts(categoryId: number, page: number = 0, size: number = 20) {
    const url = `${this.apiUrl}` + 'Product?categoryId=' + `${categoryId}` + "&page=" + `${page}` + "&size=" + `${size}`;
    return this.http.get<ProductsRootObjectDto>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /*searchProducts(searchString: string, size: number = 5): Observable<string[]> {
    if (!searchString.trim()) {
      // if not search string, return empty array.
      return of([]);
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<string[]>(`${this.apiUrl}Product/Names?search=${searchString}&size=${size}`, this.authService.jsonTokenHeader()).pipe(
      catchError(this.handleError)
    );
  }

  getProducts(searchString: string, page: number = 0, size: number = 10, countryId?: number): Observable<ArrayOfProductsResponseDataModel> {
    var url = `${this.apiUrl}Product?search=${searchString}&size=${size}&page=${page}&countryId=${countryId}`;
    return this.http.get<ArrayOfProductsResponseDataModel>(url, this.authService.jsonTokenHeader()).pipe(
      catchError(this.handleError)
    );
  }*/

  getSimillarProducts(productGuid: string, size: number = 8, page?: number) {
    var url = `${this.apiUrl}Product/similar/${productGuid}?size=${size}&page=${page}`;
    // console.log(url);
    return this.http.get<ProductsRootObjectDto>(url).pipe(
      catchError(this.handleError)
    );
  }

  /*reportProduct(ProductReportCreateModel: ProductReportCreateModel) {
    var url = `${this.apiUrl}Product/redflag`;
    return this.http.post(url, ProductReportCreateModel, this.authService.jsonTokenHeader()).pipe(
      catchError(this.handleError)
    );
  }

  getFilteredProducts(searchString: string, size: number = 20, page: number = 0, filterModel: SearchFilterRequestModel) {
    var url = `${this.apiUrl}Product/filters?search=${searchString}&size=${size}&page=${page}`;
    // console.log(url, filterModel)
    return this.http.post<ArrayOfProductsResponseDataModel>(url, filterModel, this.authService.jsonTokenHeader()).pipe(
      catchError(this.handleError)
    );
  }*/
}
