import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(categories: any, searchText: any): any {
    if (searchText == null) {return categories; }

    return categories.filter(function (category) {
      return (category.ExtendedName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
      category.Name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    });
  }

}
