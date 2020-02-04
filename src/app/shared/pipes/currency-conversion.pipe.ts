import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyRatesModel } from '../models/data.model';

@Pipe({
  name: 'currencyConversion'
})
export class CurrencyConversionPipe implements PipeTransform {

  transform(price: number, currency: string): number {
    try {
      var rates: CurrencyRatesModel = JSON.parse(localStorage.currencyRate);
      const conversion_rate: number = rates.rates[currency];
      if (conversion_rate) {
        return (price/100) / conversion_rate;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

}
