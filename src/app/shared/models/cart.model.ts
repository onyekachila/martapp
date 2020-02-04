import { ProductUnitViewModel, ProductBuyNowRangeModel, ProductImageDto } from "./product.model";
import { LogisticsCompanyViewModel } from "./logistics.model";
import { AcceptedCurrencyViewModel } from "./currency.model";

export interface ShoppingCartProductPostModel {
    // CartId: string;
    Quantity: number;
    ProductGuid: string;
    PickupCity: string;
    PickupCountry: string;
    DropoffCity: string;
    DropoffCountry: string;
}

export interface ShoppingCartViewModel {
    CartId: string;
    DeliveryCountry: string;
    DeliveryCity: string;
    Stores: StoreInCartViewModel[];
}

export interface StoreInCartViewModel {
    StoreGuid: string;
    Name: string;
    ExternalUrl: string;
    Email: string;
    PhoneNumber: string;
    TimeCreated: any;
    ImageUrl: string;
    Products: ProductInCartViewModel[];
}

export interface ProductInCartViewModel {
    ProductGuid: string;
    CartProductId: string;
    Name: string;
    Description: string;
    Quantity: number;
    Unit: ProductUnitViewModel;
    LogisticsCompany: LogisticsCompanyViewModel;
    UnitPrice: number;
    DeliveryPrice: number;
    PickupCity: string;
    PickupCountry: string;
    // DropoffCity: string;
    // DropoffCountry: string;
    BuyNowRanges: ProductBuyNowRangeModel[];
    Currency: AcceptedCurrencyViewModel;
    ProductImages: ProductImageDto[];
}

export interface ShoppingCartProductPutModel {
    // CartId: string;
    // ProductGuid: string;
    Quantity: number;
    LogisticsProvider: string;
    DeliveryCountry: string;
    DeliveryCity: string;
}

export class ShoppingCartLogisticsPutModel {
    DeliveryCountry: string;
    DeliveryCity: string;
}
