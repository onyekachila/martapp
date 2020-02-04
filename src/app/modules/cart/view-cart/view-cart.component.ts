import { Component, OnInit } from '@angular/core';
import { ProductInCartViewModel, StoreInCartViewModel, ShoppingCartViewModel } from 'src/app/shared/models/cart.model';
import { LogisticsCompanyViewModel } from 'src/app/shared/models/logistics.model';
import { MessageSupplierComponent } from '../../business/message-supplier/message-supplier.component';
import { ToastrService } from 'ngx-toastr';
import { LogisticsService } from 'src/app/core/services/logistics.service';
import { UserService } from 'src/app/core/services/user.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { CartService } from 'src/app/core/services/cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CountryDto } from 'src/app/shared/models/country.model';
import { IpDataModel } from 'src/app/shared/models/data.model';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private utilityService: UtilityService,
    private userService: UserService,
    private logisticsService: LogisticsService,
    private toastrService: ToastrService,
    private modalService: BsModalService
  ) {
    this.utilityService.getIp().then(
      data => {
        // console.log(data)
        this.ipData = data;
        this.loopThroughCountries();
      }
    );
  }

  cartDetail: ShoppingCartViewModel;
  loading: boolean;
  AllCountries: CountryDto[];
  ipData: IpDataModel;
  selectedCountry: CountryDto;
  paymentPortalUrl: string = this.utilityService.getBaseUrl().replace("#", "") + "/afrimartpay/#/";
  // cartDeliveryData: ShoppingCartLogisticsPutModel = new ShoppingCartLogisticsPutModel();
  // tslint:disable-next-line:member-ordering
  LogisticsChannels: LogisticsCompanyViewModel[];
  bsModalRef: BsModalRef;
  isUserLoggedIn = () => this.userService.checkIfUser();

  ngOnInit() {
    this.getAllCountries(500);
    this.getCartDetails();
    this.getLogisticsChannels();
  }

  loopThroughCountries() {
    if (this.AllCountries) {
      if (this.ipData) {
        this.AllCountries.forEach(country => {
          if (country.name.trim() === this.ipData.country_name.trim()) {
            this.selectedCountry = country;
          }
        });
      } else {
        this.selectedCountry = this.AllCountries[0];
      }
    }
  }


  getAllCountries(total) {
    const africanCountries = localStorage.africanCountries;
    if (africanCountries) {
      this.AllCountries = JSON.parse(africanCountries).Data;
      this.loopThroughCountries();
    }
    this.utilityService.getCountries(0, total).subscribe(
      data => {
        this.AllCountries = data.countries;
        this.loopThroughCountries();
      }
    );
    // }
  }

  getCartDetails() {
    this.cartService.getProductsInCart().subscribe(
      data => {
        //this.cartDetail = data;
        // this.cartDeliveryData = {
        //   DeliveryCity: this.cartDetail.DeliveryCity,
        //   DeliveryCountry: this.cartDetail.DeliveryCountry
        // };
        // console.log(data);
        this.setUnitPriceForeachProduct();
      }, err => {
        this.toastrService.error(err.message || err.Message || `Something went wrong while trying to fetch your cart details`);
      }
    );
  }

  setUnitPriceForeachProduct() {
    this.cartDetail.Stores.forEach(store => {
      store.Products.forEach(product => {
        for (let a = 0; a < product.BuyNowRanges.length; a++) {
          if ((product.Quantity >= product.BuyNowRanges[a].MinQuantity) && (product.Quantity <= product.BuyNowRanges[a].MaxQuantity)) {
            product.UnitPrice = product.BuyNowRanges[a].Price;
            a = product.BuyNowRanges.length;
          }
        }
      });
    });
  }

  // talkBack(e: string) {
  //   console.log(e);
  // }

  setPrice(product: ProductInCartViewModel) {
    if (product.Quantity > product.BuyNowRanges[product.BuyNowRanges.length - 1].MaxQuantity) {
      product.UnitPrice = product.BuyNowRanges[product.BuyNowRanges.length - 1].Price;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (var a = 0; a < product.BuyNowRanges.length; a++) {
        const buyNowRange = product.BuyNowRanges[a];
        if (buyNowRange.MinQuantity <= product.Quantity && product.Quantity <= buyNowRange.MaxQuantity) {
          product.UnitPrice = buyNowRange.Price;
          return;
        } else {
          product.UnitPrice = 0;
        }
      }
    }
  }

  deleteProductFromCart(Product: ProductInCartViewModel, Store: StoreInCartViewModel) {
    this.loading = true;
    /*this.cartService.removeProductFromCart(this.cartDetail.CartId, Product.ProductGuid).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        this.cartDetail.Stores.forEach(store => {
          if (store.StoreGuid === Store.StoreGuid) {
            for (let a = 0; a < store.Products.length; a++) {
              if (store.Products[a].ProductGuid === Product.ProductGuid) {
                store.Products.splice(a, 1);
              }
            }
          }
        });
      }, error => {*/
       // this.loading = false;
        // tslint:disable-next-line:max-line-length
       // this.toastrService.error(error.message || error.Message || `Something went wrong while trying to delete ${Product.Name} from the cart`);
     // }
   // );
  }

  updateProductInCart(product: ProductInCartViewModel) {
    this.loading = true;
    // tslint:disable-next-line:max-line-length
    this.cartService.updateProductInCart({ Quantity: product.Quantity, LogisticsProvider: product.LogisticsCompany.Id, DeliveryCountry: this.cartDetail.DeliveryCountry, DeliveryCity: this.cartDetail.DeliveryCity }, this.cartDetail.CartId, product.ProductGuid);
  /* .subscribe(
      data => {
        this.loading = false;
       // this.cartDetail = data;
        // console.log(data)
      }, error => {
        this.loading = false;
        // tslint:disable-next-line:max-line-length
        this.toastrService.error(error.message || error.Message || `Something went wrong while trying to update ${product.Name}'s entry in the cart`);
        // console.log(error);
      }
    );*/
  }

  getProductDeliveryInfoAndLogisticsProviderEstimate(product: ProductInCartViewModel, logisticChannel: LogisticsCompanyViewModel) {
    // console.log("eh", product.LogisticsCompany)
    if (!product.LogisticsCompany || (product.LogisticsCompany && (product.LogisticsCompany.Id != logisticChannel.Id))) {
      product.LogisticsCompany = logisticChannel;
      this.updateProductInCart(product);
      this.loading = true;
      // tslint:disable-next-line:max-line-length
      this.cartService.getProductDeliveryInfoAndLogisticsProviderEstimate(this.cartDetail.CartId, product.ProductGuid, product.LogisticsCompany.Id);
     /* .subscribe(
        data => {
          this.loading = false;
         // product.DeliveryPrice = data.TotalCharge;
          // this.cartDetail = data;
          // console.log(data)
        }, error => {
          this.loading = false;
          // tslint:disable-next-line:max-line-length
          this.toastrService.error(error.message || error.Message || `Something went wrong while trying to fetch delivery estimate for ${product.Name}`);
          console.log(error);
        }
      );*/
    }
  }

  openMessageSupplierDialog(store) {
    const initialState = {
      store: store
    };
    this.bsModalRef = this.modalService.show(MessageSupplierComponent, { initialState });
  }

  getPriceInUSD(currencyCode: string, price: number) {
    // console.log(price);
    if (currencyCode === 'USD') {
    } else {
      price = price / this.utilityService.getExchangeRate(currencyCode);
    }
    // console.log(price)
    return price;
  }

  getTotal() {
    let total = 0;
    if (this.cartDetail.Stores) {
      this.cartDetail.Stores.forEach(store => {
        store.Products.forEach(product => {
          total += this.getPriceInUSD(product.Currency.CurrencyCode, (product.UnitPrice * product.Quantity));
        });
      });
    }
    return total;
  }

  getLogisticsChannels() {
    this.logisticsService.getAvailableLogisticChannels().subscribe(
      data => {
        //this.LogisticsChannels = data.Data;
        // console.log(this.LogisticsChannels)
      }
    );
  }

  updateCartDeliveryData() {
    // tslint:disable-next-line:max-line-length
    /*this.cartService.updateCartDelivery(this.cartDetail.CartId, { DeliveryCity: this.cartDetail.DeliveryCity, DeliveryCountry: this.cartDetail.DeliveryCountry })
    .subscribe(
      data => {
        // console.log(data)
        this.cartDetail = null;
        this.getCartDetails();
      }, error => {
        this.toastrService.error(error.message || error.Message || `Something went wrong while trying to update the cart's delivery point`);
      }
    );*/
  }

  checkIfValidForCheckout(storeGuid?: string) {
    let products: ProductInCartViewModel[] = [];
    // if (!this.isUserLoggedIn() || this.loading) {
    //   return false;
    // }
    // if (storeGuid) {
    //   this.cartDetail.Stores.forEach(store => {
    //     if (store.StoreGuid) {
    //       products = store.Products;
    //     }
    //   });
    // } else {
    //   this.cartDetail.Stores.forEach(store => {
    //     store.Products.forEach(product => {
    //       products.push(product);
    //     });
    //   });
    // }
    // for (var a = 0; a < products.length; a++) {
    //   const product = products[a];
    //   if (product.Quantity < 1 || !product.LogisticsCompany) {
    //     a = products.length;
    //     return false;
    //   }
    // }
    return true;
  }

  checkIfLogisticCompany(product: ProductInCartViewModel, logisticChannel: LogisticsCompanyViewModel) {
    // console.log(product.LogisticsCompany.Id, logisticChannel.Id);
    if (product.LogisticsCompany) {
      if (product.LogisticsCompany.Id === logisticChannel.Id) {
        return true;
      }
    }
    return false;
  }

}
