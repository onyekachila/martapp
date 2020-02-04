import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(user: any, searchText: string): any {
    if (!searchText) { return user; }

    return user.filter(function (user) {
      if (user.FirstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        return user;
      } else if (user.LastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        return user;
      } else if ((user.FirstName + " " + user.LastName).toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        return user;
      } else if ((user.FirstName + "" + user.LastName).toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        return user;
      } else if ((user.LastName + " " + user.FirstName).toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        return user;
      } else if ((user.LastName + "" + user.FirstName).toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        return user;
      }
    });
  }

}
