import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPipe } from './category.pipe';
import { OrderByPipe } from './order-by.pipe';
import { ProductPipe } from './product.pipe';
import { PricePipe } from './price.pipe';
import { TimePipe } from './time.pipe';
import { UserPipe } from './user.pipe';
import { CurrencyConversionPipe } from './currency-conversion.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CategoryPipe,
    OrderByPipe,
    PricePipe,
    ProductPipe,
    TimePipe,
    UserPipe,
    CurrencyConversionPipe
  ],
  exports:[
    CategoryPipe,
    OrderByPipe,
    PricePipe,
    ProductPipe,
    TimePipe,
    UserPipe,
    CurrencyConversionPipe
  ]
})
export class PipesModule { }
