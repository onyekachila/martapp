import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
//import { AuthenticationService } from './authentication.service';
import { CategoryDto } from 'src/app/shared/models/category.model';
import { CategoriesRootObject } from 'src/app/shared/models/data.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private apiService: BaseApiService
              ) { }


  getTopCategories(size: number = 8, hasProducts: boolean = false) {
    const url = '/categories/topCategories?page=1&limit=' + `${size}` + '&Fields=id,name,description,image';
    return this.apiService.get<CategoriesRootObject>(url).pipe(
    );
  }

  getCategory(categoryId: number) {
    const url = 'Category/' + `${categoryId}`;
   /* return this.http.get<CategoryViewModel>(url, this.authService.jsonTokenHeader()).pipe(
      retry(3),
      catchError(this.handleError)
    );*/
  }

  getAllCategories(): Observable<CategoryDto[]> {
    const url = '/categories/topCategories?page=1&limit=100' + '&Fields=id,name,description,image';
    return this.apiService.get<CategoriesRootObject>(url).pipe(
    );

  }

 /* getAllCategoriesX(): Observable<CategoryViewModel[]> {
    const url = `${this.apiUrl}category/Top/root?page=0&size=100&summary=false`;
    /*return this.http.get<ArrayOfCategoriesResponseDataModel>(url, this.authService.jsonTokenHeader()).pipe(
      retry(1),
      map(res => { localStorage.afrimart_Categories = JSON.stringify(res.Data); return res.Data; }),
      catchError(this.handleError)
    );
  }*/

  searchCategories(searchString: string, size: number = 5, hasProducts: boolean = true): Observable<string[]> {
    if (!searchString.trim()) {
      return of([]);
    }
    // tslint:disable-next-line:max-line-length
  //  return this.http.get<string[]>(`${this.apiUrl}category/Names?search=${searchString}&size=${size}&hasProducts=${hasProducts}`,
   // this.authService.jsonTokenHeader()).pipe(
   //   catchError(this.handleError)
   // );
  }
}
