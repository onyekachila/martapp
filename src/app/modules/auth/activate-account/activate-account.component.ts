import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
//import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ActivateAccountDto } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  constructor(
    private userService: UserService,
   // private authService: AuthenticationService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  loading = false;
  model: ActivateAccountDto = {
    email: '', code: ''
  };
  successful: boolean;

  ngOnInit() {
   // if (this.authService.getLocalCurrentUser()) {
   //   this.userService.logout(false);
   // }
    this.ActivateAccount();
  }

  ActivateAccount() {
    this.successful = undefined;
    this.model.email = this.route.snapshot.params['email'];
    this.model.code = this.route.snapshot.params['code'];
    this.loading = true;
    this.userService.activateAccount(this.model)
      .subscribe(
        () => {
          this.successful = true;
          this.toastr.success('Account activation Successfull!', "Login with password to proceed", {
            positionClass: "toast-bottom-center",
            tapToDismiss: true,
            timeOut: 10000,
            progressBar: true
          });
        },
        error => {
          this.successful = false;
          this.toastr.error('Account activation Failed!', error || "Something went wrong", {
            positionClass: "toast-bottom-center",
            tapToDismiss: true,
            timeOut: 10000,
            progressBar: true
          });
        });
  }

}
