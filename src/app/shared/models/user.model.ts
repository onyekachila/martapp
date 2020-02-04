import { LanguageDto } from "./language.model";

export interface ThirdPartyModel {
    Provider: string;
    AccessToken: string;
}

export interface LoginResponseModel {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_toke: string;
    userName: string;
    roles: string;
}

export interface ApplicationUserViewModel {
    ApplicationUserId: string;
    CurrentRating: number;
    CurrentSubscription: MerchantSubscriptionViewModel;
    DateOfBirth: any;
    DefaultCountryId: number;
    DefaultCountryName: string;
    Email: string;
    FirstName: string;
    Gender: string;
    HasPassword: boolean;
    HasRegistered: boolean;
    ImageUrl: string;
    LastName: string;
    LoginProvider: string;
    LoginTypes: string[];
    MarketerOrganization: MarketerOrganizationModel;
    PhoneNumber: string;
    PreferredCurrencyId: number;
    PreferredCurrencyName: string;
    PreferredCurrencySymbol: string;
    PreferredLanguage: LanguageDto;
    Roles: string[];
    UserUniqueKey: string;
}

export interface MarketerOrganizationModel {
    Id: string;
    MyRoles: string[];
    Name: string;
    Owner: ApplicationUserViewModel;
    TimeCreated: any;
}

export interface MerchantSubscriptionViewModel {
    StartTime: any;
    ExpiryTime: any;
    IsAutoRenew: boolean;
    UserId: string;
    SubscriptionTypeId: number;
    Name: string;
}

export interface ChangePasswordBindingModel {
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
}

export interface ResetPasswordWithCodeModel {
    Code: string;
    Password: string;
    Email: string;
}

export interface UpdateUserImageFromUrlModel {
    url: string;
}

export interface UserImageUpdateModel {
    File: string;
}

export interface ImageViewModel {
    ImageData: string;
}

export interface CustomerDto {
    email: string;
    password: string;
    confirmPassword: string;
   // PreferredLanguageId?: number;
    //OriginatingBank?: string;
    //ReferrerCode?: string;
    firstname?: string;
    lastname?: string;
    phonenumber?: string;
    defaultCountryId?: number;
    role_ids: number[];
}

export interface ActivateAccountDto {
    email: string;
    code: string;
}

export interface ApplicationUserInfoViewModel {
    ApplicationUserId: string;
    UserUniqueKey: string;
    Email: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Gender: string;
    DefaultCountryId: number;
    PreferredCurrencyId: number;
    CurrentRating: number;
    CurrentSubscription: MerchantSubscriptionViewModel;
    PreferredLanguage: LanguageDto;
}

export interface UserProfilePicturePostModel {
    File: string;
}

export interface UserProfilePictureUrlPostModel {
    url: string;
}

export interface FacebookLoginResponseDataModel {
    additionalUserInfo: {
        profile: {
            email: string;
            first_name: string;
            gender: string;
            last_name: string;
            id: string;
            locale: string;
            name: string;
            age_range: {
                min: number;
            },
            picture: {
                data: {
                    height: number;
                    url: string;
                    width: number;
                }
            }
        },
        providerId: string;
    };
    credential: {
        accessToken: string;
    };
    operationType: string;
    user: {
        phoneNumber: any;
    }
}

export interface GoogleLoginResponseDataModel {
    additionalUserInfo: {
        profile: {
            email: string;
            given_name: string;
            family_name: string;
            gender: string;
            id: string;
            locale: string;
            name: string;
            age_range: {
                min: number;
            },
            picture: string;
        },
        providerId: string;
    };
    credential: {
        accessToken: string;
    };
    user: {
        phoneNumber: any;
    }
}

export class SocialLoginDataModel {
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    phone_number: any;
    full_name: string;
    picture_url: string;
    providerId: string;
    access_token: string;
    locale: string;
}

export interface LoginModel {
    username: string,
    password: string,
    grant_type: string
}

export interface UpdateUserModel {
    FirstName: string;
    LastName: string;
    DefaultCountryId: number;
    PreferredCurrencyId: number;
    DateOfBirth: any;
    PhoneNumber: string;
    PreferredLanguageId: number;
}

export interface BanksModel {
    Id: string;
    FullName: string;
}
