import { PaymentViewItem } from "./payment.model";

export interface MerchantSubscriptionTypeViewModel {
    MerchantType: number;
    Name: string;
    PaymentItemId: number;
    MaximumStores: number;
    MaximumProducts: number;
    MaximumImagesPerProduct: number;
    IsImagesAllowed: boolean;
    IsVideosAllowed: boolean;
    MaximumVideosPerProduct: number;
    IsMicrositeAllowed: boolean;
    ExposureLevel: number;
    CanPostAdverts: boolean;
    CanPurchaseLeads: boolean;
    MaxLeadsPerMonth: number;
    MaxLeadKeywords: number;
    MaximumMicrosites: number;
    PaymentItem: PaymentViewItem;
    Data: {
        Position: string,
        Name: string,
        Value: any
    }[]
}

export const ExposureLevel: string[] = [
    "Regional",
    "Continental",
    "Global"
]

export const MerchantType = {
    1: "Free",
    2: "Silver",
    3: "Gold",
    4: "Platinum"
}