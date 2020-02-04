import { AcceptedCurrencyViewModel } from "./currency.model";

export interface PaymentViewItem {
    Amount: number;
    BaseCurrency: AcceptedCurrencyViewModel;
    Description: string;
    Id: number;
    PaymentTypeCode: string;
    Name: string;
    PaymentItems: PaymentViewItem[];
}