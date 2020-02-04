import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'price'
})

export class PricePipe implements PipeTransform {

    transform(price: any): any {
        if (price == null) { return price; }

        return (price / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

}
