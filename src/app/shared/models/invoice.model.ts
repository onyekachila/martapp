import { VendorDto } from "./store.model";
import { ApplicationUserInfoViewModel } from "./user.model";
import { AcceptedCurrencyViewModel } from "./currency.model";
import { ProductDto, ProductUnitViewModel } from "./product.model";
import { LogisticsItemViewModel } from "./logistics.model";

export interface StoreInvoiceViewModel {
    Id: string;
    Supplier: VendorDto;
    Buyer: ApplicationUserInfoViewModel;
    Currency: AcceptedCurrencyViewModel;
    TimeGenerated: any;
    TimePaid: any;
    TimeDeleted: any;
    ValidityInWeeks: number;
    TimeExpired: any;
    Products: ProductInvoiceViewModel[];
    LogisticsItem: LogisticsItemViewModel;
}

export interface ProductInvoiceViewModel {
    Id: string;
    Product: ProductDto;
    Quantity: number;
    ProductUnit: ProductUnitViewModel
    Price: number;
    Specifications: string;
}

export interface StoreInvoiceDeliveryAddressUpdateModel {
    InvoiceId: string;
    ToCountryCode: string;
    ToCity: string;
    ToPostalCode: string;
    ToAddress: string;
}
