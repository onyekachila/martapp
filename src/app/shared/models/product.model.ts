import { AcceptedCurrencyViewModel } from "./currency.model";
import { CategorySummaryResponseModel } from "./category.model";
import { StoreSummaryViewModel } from "./store.model";

export interface ProductDto {
    productGuid?: string;
    name: string;
    description?: string;
    images?: string[];
    MinimumPricePerUnit?: number;
    MaximumPricePerUnit?: number;
    MinimumNumberOfUnits?: number;
    PurchaseProductUnitId?: number;
    DefaultCurrencyId?: number;
    DefaultCurrencySymbol?: string;
    TimeCreated?: any;
    IsInStock?: boolean;
    NumberOfImages?: number;
    MerchantTypeId?: number;
    IsApproved?: boolean;
    ProductImages?: ProductImageDto[];
    PurchaseProductUnit?: ProductUnitViewModel;
    DefaultCurrency?: AcceptedCurrencyViewModel;
    Categories?: CategorySummaryResponseModel[];
    BuyNowRanges?: ProductBuyNowRangeModel[];
    RequiresDelivery?: boolean;
    PickupCity?: string;
    PickupCountry?: string;
    Store?: StoreSummaryViewModel
}

export interface ProductImageDto {
    id: number;
    picture_id: number;
    position: number;
    src: string;
    attachment: string;
}

export interface ProductUnitViewModel {
    Id: number;
    Name: string;
    Symbol: string;
}

export class ProductReportCreateModel {
    ProductGuid: string;
    Reason: string;
    OtherInfo: string;
}

export class ProductBuyNowRangeModel {
    MinQuantity: number;
    MaxQuantity: number;
    Price: number;
}

export class SearchFilterRequestModel {
    CountryIds?: number[];
    Region?: string[];
    MaxPrice?: number;
    MinPrice?: number;
}

export interface ProductInWishListModel {
    Id: string;
    Product: ProductDto;
    TimeAdded: string;
}
