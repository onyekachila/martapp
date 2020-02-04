import { Injectable, Output, EventEmitter } from '@angular/core';
//import { AuthenticationService } from './authentication.service';
import { GeneralService } from './general.service';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProductDto, ProductInWishListModel } from 'src/app/shared/models/product.model';
import { ArrayOfProductsInwishListResponseDataModel } from 'src/app/shared/models/data.model';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  @Output() WishListItems: EventEmitter<any> = new EventEmitter();
  @Output() loadedWishList: EventEmitter<any> = new EventEmitter();
  private handleError = this.generalService.handleError;
  private apiUrl = this.generalService.apiUrl;

  constructor(
   // private authService: AuthenticationService,
    private generalService: GeneralService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  addProductToLocalStorageWishList(product: ProductDto) {
    let localData = this.getWishListLocal();
    // console.log(localData)
    if (!localData) {
      localData = [];
    }
   // if (localData.findIndex(x => x.Product.ProductGuid === product.ProductGuid) == -1) {
   //   localData.push({ Product: product, Id: "", TimeAdded: `${new Date().getDate}` })
  //  }
    localStorage.afrimartWishList = JSON.stringify(localData);
    // console.log(this.getWishListLocal())
  }

  removeProductFromLocalStorageWishList(productId: string) {
   //let localData = this.getWishListLocal();
   /* let index = localData.findIndex(x => x.Product.ProductGuid === productId)
    if (index > -1) {
      localData.splice(index, 1);
    }
    localStorage.afrimartWishList = JSON.stringify(localData);*/
  }

  saveWishListLocal(data: ProductInWishListModel[]) {
    if (data) {
      localStorage.afrimartWishList = JSON.stringify(data);
    }
    this.loadedWishList.emit();
  }


  getProductsInWishList(page: number = 0, size: number = 20) {
   /* const currentUser = this.authService.getLocalCurrentUser();
    if (currentUser) {
      return this.http.get<ArrayOfProductsInwishListResponseDataModel>(this.apiUrl + 'user/wishlist?page=' +
        page + '&size=' + size, this.authService.jsonTokenHeader()).pipe(
          retry(1),
          map((response) => {
          //  this.saveWishListLocal(response.Data);
            return response;
          }),
          catchError(this.handleError)
        );
    }*/
  }


  removeProductFromWishList(productIds: string[]) {
   /* const currentUser = this.authService.getLocalCurrentUser();
    if (currentUser) {
      // console.log(productIds);
      var url = this.apiUrl + 'user/wishlist?';
      var index: number = 0;
      productIds.forEach(productId => {
        this.removeProductFromLocalStorageWishList(productId);
        url = url + "items=" + productId;
        index++;
        if (index < productIds.length) {
          url = url + "&";
        }
      });
      // console.log(url);
      this.removeFromWishlist(url).subscribe(
        data => {
          // console.log(data)
        }
      );
    } else {
      this.WishListItems.emit(false);
    }*/
  }

  removeFromWishlist(url: string) {
    return this.http.delete(url).pipe(
      retry(1),
      map(res => {
        // console.log(res, "returned");
        this.WishListItems.emit(true);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getWishListLocal(): ProductInWishListModel[] {
    try {
      return JSON.parse(localStorage.afrimartWishList);
    } catch (error) {
      // console.error(error);
      return null;
    }
  }

  addProductIdsToWishList(productIds: string[]) {
    return this.http.post(this.apiUrl + 'user/wishlist',
      JSON.stringify(productIds))
      .pipe(retry(1), catchError(this.handleError));
  }

  addToWishList(product: ProductDto) {
  //  const arr = [product.ProductGuid];
   // const currUser = this.authService.getLocalCurrentUser();
  //  if (currUser) {
    //  this.addProductToLocalStorageWishList(product);
    //  this.addProductIdsToWishList(arr).subscribe(
     //   () => {
     //     this.WishListItems.emit(true);
          // this.toastr.success("", `${(product.Name).toUpperCase()} added to wishlist`);
     //   }, () => {
        //  this.removeProductFromLocalStorageWishList(product.ProductGuid);
     //   }
     // );
   // } else {
    //  this.toastr.warning("Login to add Item to wishlist", `Not Logged In`)
   // }
  }



  setIfProductInWishList(id) {
    let res = false;
   // if (this.authService.getLocalCurrentUser()) {
      const wishlist = this.getWishListLocal();
      // console.log(wishlist);
      if (wishlist) {
       // if (wishlist.findIndex(x => `${x.Product.ProductGuid}` === `${id}`) > -1) {
       //   res = true;
       // }
      }
   // }
    return res;
  }

}
