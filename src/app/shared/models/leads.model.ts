export interface LeadsNewRequestModel {
    ProductName: string;
    Quantity: number;
    ProductUnitId: number;
    PriceRange: string;
    MaxPrice: number;
    MinPrice: number;
    AcceptedCurrencyId: number;
    Details: string;
    UserName: string;
    UserEmail: string;
    TargetCountryIds: number[];
}