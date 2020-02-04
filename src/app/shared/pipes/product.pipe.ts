import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

  transform(products: any, searchText: any): any {
    if (searchText == null) {return products; }

    return products.filter(function (product) {
      return product.Name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }

}
