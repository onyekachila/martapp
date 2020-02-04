import { ApplicationUserInfoViewModel } from "./user.model";
import { CountryDto } from "./country.model";
import { LanguageDto } from "./language.model";
import { CategorySummaryResponseModel } from "./category.model";

export interface VendorDto {
    StoreGuid: string;
    OwnerId: string;
    name: string;
    description: string;
    ExternalUrl: string;
    Email: string;
    PhoneNumber: string;
    ProductCount: number;
    ImageFile: string;
    ImageUrl: string;
    TimeCreated: any;
    Latitude: number;
    Longitude: number;
    IsApproved: boolean;
    MicrositeSlug: string;
    Owner: ApplicationUserInfoViewModel;
    LocationCountry: CountryDto;
    PreferredLanguage: LanguageDto;
    StoreReceivedBadges: StoreReceivedBadgeViewModel[];
    Categories: CategorySummaryResponseModel[];
}


export class StoreReportCreateModel {
    StoreGuid: string;
    Reason: string;
    OtherInfo: string;
}

export interface StoreSummaryViewModel {
    StoreGuid: string;
    OwnerId: string;
    Name: string;
    ExternalUrl: string;
    Email: string;
    PhoneNumber: string;
    ProductCount: number;
    ImageUrl: string;
    TimeCreated: any;
    IsApproved: boolean;
    MicrositeSlug: string;
    MerchantTypeId: number;
    Rating: number;
    LocationCountry: CountryDto;
    PreferredLanguage: LanguageDto;
    StoreReceivedBadges: StoreReceivedBadgeViewModel[];
    Categories: CategorySummaryResponseModel[];
}

export interface StoreReceivedBadgeViewModel {
    ImageUrl: string;
    BadgeName: string;
    BadgeDescription: string;
    TimeReceived: string;
}
