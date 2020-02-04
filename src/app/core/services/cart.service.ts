import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { retry, catchError, map } from 'rxjs/operators';
//import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { ShoppingCartViewModel, ShoppingCartProductPutModel, ShoppingCartLogisticsPutModel } from 'src/app/shared/models/cart.model';
import { ShoppingCartProductPostModel } from '../../shared/models/cart.model';
import { LogisticChannelEstimateModel } from 'src/app/shared/models/logistics.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,
    private generalService: GeneralService,
   // private authService: AuthenticationService,
    private userService: UserService) { }

  apiUrl = this.generalService.apiUrl;
  handleError = this.generalService.handleError;

  getCartId() {
    var cartId;
    try {
      if (!this.userService.checkIfUser()) {
        cartId = localStorage.anonUserCartId;
      }
    } catch (error) {
    }
    return cartId;
  }


  addProductToCart(ProductGuid: string, Quantity: number, DropoffCity?: string, DropoffCountry?: string, PickupCity?: string, PickupCountry?: string) {
    var cartId = this.getCartId();
    /*var ShoppingCartProductPostModel: ShoppingCartProductPostModel = {
      ProductGuid: ProductGuid,
      Quantity: Quantity,
      // CartId: cartId,
      DropoffCity: DropoffCity,
      DropoffCountry: DropoffCountry,
      PickupCity: PickupCity,
      PickupCountry: PickupCountry
    }
    // console.log(ShoppingCartProductPostModel);
    return this.http.post<ShoppingCartViewModel>(`${this.apiUrl}ShopCart/${cartId}`,ShoppingCartProductPostModel, this.authService.jsonTokenHeader()).pipe(
      retry(1),
      map(res => {
        if (!this.userService.checkIfUser()) {
         // localStorage.anonUserCartId = `${res.CartId}`;
          // console.log(localStorage.anonUserCartId)
          return res;
        }
      }),
      catchError(this.handleError)
    )*/
  }

  getProductsInCart() {
    var cartId = this.getCartId();
    // console.log(cartId)
    return this.http.get<ShoppingCartViewModel>(`${this.apiUrl}Shopcart/${cartId}`,
     //this.authService.jsonTokenHeader()).pipe(
     // retry(1),
     // catchError(this.handleError)
    );
  }

  removeProductFromCart(cartId: string, productGuid: string) {
    // console.log(`${this.apiUrl}Shopcart?cart=${cartId}&product=${productGuid}`)
   // return this.http.delete(`${this.apiUrl}Shopcart/${cartId}/products/${productGuid}`, this.authService.jsonTokenHeader()).pipe(
   //   catchError(this.handleError)
   // )
  }

  updateProductInCart(updateProductInCartData: ShoppingCartProductPutModel, CartId: string, productId: string) {
   // return this.http.put<ShoppingCartViewModel>(`${this.apiUrl}Shopcart/${CartId}/products/${productId}`,
  //  updateProductInCartData, this.authService.jsonTokenHeader()).pipe(
   //   catchError(this.handleError)
    //);
  }

  updateCartDelivery(cartId: string, cartDeliveryData: ShoppingCartLogisticsPutModel) {
   // return this.http.put<ShoppingCartViewModel>(`${this.apiUrl}Shopcart/${cartId}`, cartDeliveryData,
    // this.authService.jsonTokenHeader())
    //  .pipe(
    //    catchError(this.handleError)
     // );
  }

  getProductDeliveryInfoAndLogisticsProviderEstimate(cartId: string, productId: string, provider: string) {
   // return this.http.put<LogisticChannelEstimateModel>(`${this.apiUrl}ShopCart/${cartId}/products/${productId}/providers/${provider}`, undefined, this.authService.jsonTokenHeader()).pipe(
   //   catchError(this.handleError)
   // );
  }

}
