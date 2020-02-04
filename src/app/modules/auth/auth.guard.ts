import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate() {
    if (this.userService.checkIfUser()) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }

  }
}
