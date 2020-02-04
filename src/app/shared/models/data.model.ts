import { ProductDto, ProductUnitViewModel, ProductInWishListModel } from "./product.model";
import { VendorDto } from "./store.model";
import {  CategoryDto } from './category.model';
import { CountryDto } from "./country.model";
import { AcceptedCurrencyViewModel } from "./currency.model";
import { LanguageDto } from "./language.model";
import { StoreInvoiceViewModel } from "./invoice.model";
import { UserMessageContactModel, MessageModel } from "./message.model";
import { BanksModel } from "./user.model";
import { LogisticsCompanyViewModel } from "./logistics.model";

export interface ProductsRootObjectDto {
    Page: number;
    Size: number;
    products: ProductDto[];
    Count: number;
}

export interface ArrayOfProductsInwishListResponseDataModel {
    Page: number;
    Size: number;
    Data: ProductInWishListModel[];
    Count: number;
}

export interface VendorsRootObject {
    Page: number;
    Size: number;
    vendors: VendorDto[];
    Count: number;
}

export interface CategoriesRootObject {
    Page: number;
    Size: number;
    categories: CategoryDto[];
    Count: number;
}

export interface CountryRootObject {
    Page: number;
    Size: number;
    countries: CountryDto[];
    Count: number;
}

export interface ArrayOfCurrenciesResponseDataModel {
    Page: number;
    Size: number;
    Data: AcceptedCurrencyViewModel[];
    Count: number;
}

export interface ArrayOfProductUnitsResponseDataModel {
    Page: number;
    Size: number;
    Data: ProductUnitViewModel[];
    Count: number;
}

export interface LanguagesRootObject {
    Page: number;
    Size: number;
    languages: LanguageDto[];
    Count: number;
}

export interface ArrayOfInvoicesResponseDataModel {
    Page: number;
    Size: number;
    Data: StoreInvoiceViewModel[];
    Count: number;
}

export interface ArrayOfObjectResponseDataModel {
    Page: number;
    Size: number;
    Data: any[];
    Count: number;
}

export interface ArrayOfBanksResponseDataModel {
    Page: number;
    Size: number;
    Data: BanksModel[];
    Count: number;
}

export interface ArrayOfMessagesResponseDataModel {
    Page: number;
    Size: number;
    Data: MessageModel[];
    Count: number;
}

export interface ArrayOfLogisticsResponseDataModel {
    Page: number;
    Size: number;
    Data: LogisticsCompanyViewModel[];
    Count: number;
}


export interface ArrayOfMessageContactResponseDataModel {
    Data: UserMessageContactModel[];
    Page: number;
    Size: number;
    Count: number;
}

export interface IpDataModel {
    ip: string,
    type: string,
    continent_code: string,
    continent_name: string,
    country_code: string,
    country_name: string,
    region_code: string,
    region_name: string,
    city: string,
    zip: any,
    latitude: number,
    longitude: number,
    location: {
        geoname_id: number,
        capital: string,
        languages: [{
            code: string,
            name: string,
            native: string,
        }],
        country_flag: string,
        country_flag_emoji: string,
        country_flag_emoji_unicode: string,
        calling_code: string,
        is_eu: boolean
    },
    time_zone: {
        id: string,
        current_time: string,
        gmt_offset: number,
        code: string,
        is_daylight_saving: boolean
    },
    currency: {
        code: string,
        name: string,
        plural: string,
        symbol: string,
        symbol_native: string,
    },
    connection: {
        asn: number,
        isp: string,
    }
}

export interface CurrencyRatesModel {
    success: boolean,
    timestamp: number,
    base: string,
    date: string,
    rates: {}
}
