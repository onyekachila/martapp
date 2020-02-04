export interface LogisticsItemViewModel {
    FromCountryCode: string;
    FromCity: string;
    FromPostalCode: string;
    FromAddress: string;
    ToCountryCode: string;
    ToCity: string;
    ToPostalCode: string;
    ToAddress: string;
    DimensionUnitId: number;
    WeightUnitId: number;
    Pieces: LogisticsItemPieceViewModel;
}

export interface LogisticsItemPieceViewModel {
    Height: number;
    Width: number;
    Weight: number;
    Depth: number;
}

export interface LogisticsEstimateRequestModel {
    CompanyId: string;
    InvoiceId: string;
    ToAddress: string;
    ToCity: string;
    ToCountryCode: string;
    ToPostalCode: string;
}

export class LogisticChannelEstimateModel {
    CompanyId: string;
    CurrencyCode: string;
    DeliveryDate: string;
    GlobalName: string;
    InvoiceId: string;
    OtherCharges: any[] = [];
    PickupDate: string;
    TaxAmount: string;
    TotalCharge: any;
    TotalTransitDays: string;
    WeightCharge: string;
    WeightChargeTax: string;
}

export interface LogisticsCompanyViewModel {
    Id: string;
    Name: string;
    ShortName: string;
    ImageUrl: string;
}