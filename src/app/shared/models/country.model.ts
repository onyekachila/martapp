import { AcceptedCurrencyViewModel } from "./currency.model";

export interface CountryDto {
    id: number;
    name: string;
    ISOCode?: string;
    CallingCode?: string;
    DefaultCurrency?: AcceptedCurrencyViewModel;
    IsTradingCountry?: boolean;
    Region?: string;
}
