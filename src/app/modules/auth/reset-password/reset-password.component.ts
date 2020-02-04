import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { ResetPasswordWithCodeModel } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public loading: boolean;
  viewPassword: boolean = false;
  model: ResetPasswordWithCodeModel = {
    Email: '',
    Password: '',
    Code: ''
  }
  confirm_password: '';
  successful: boolean;
  passwordFormControl = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required,
  ]);
  cpasswordFormControl = new FormControl({ value: '', disabled: this.loading }, [
    Validators.required,
  ]);
  errror: boolean;
  requestNewResetPasswordLinkSuccess: boolean;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.model.Code = this.route.snapshot.paramMap.get('code');
    this.model.Email = this.route.snapshot.paramMap.get('email');
  }



  ChangePassword() {
    this.model.Password = this.passwordFormControl.value;
    this.confirm_password = this.cpasswordFormControl.value;
    if (this.model.Password !== this.confirm_password) {
      this.toastr.info('Password and confirm password not matching', "", {
        positionClass: "toast-bottom-center",
        tapToDismiss: true,
        timeOut: 5000,
      });
    } else if (this.model.Password === "") {
      this.toastr.info('Password can not be empty', "", {
        positionClass: "toast-bottom-center",
        tapToDismiss: true,
        timeOut: 5000,
      });
    } else {
      // console.log(JSON.stringify(this.model))
      this.loading = true;
      this.userService.ResetPassword({ Code: this.model.Code, Email: encodeURI(this.model.Email), Password: encodeURI(this.model.Password) })
        .subscribe(
          data => {
            this.loading = false;
            this.successful = true;
            if (this.userService.checkIfUser()) {
              this.userService.logout().then();
            }
            this.toastr.success('Password has been reset', "Login with New Password", {
              positionClass: "toast-bottom-center",
              tapToDismiss: true,
              timeOut: 10000,
            });
          },
          error => {
            this.errror = true;
            console.log(error)
            this.toastr.error('Password reset failed', error || "Something went wrong", {
              positionClass: "toast-bottom-center",
              tapToDismiss: true,
              timeOut: 10000,
            });
            this.loading = false;
          });
    }
  }

  requestNewResetPasswordLink() {
    this.loading = true;
    this.userService.requestNewResetPasswordLink(encodeURI(this.model.Email)).subscribe(
      data => {
        this.errror = false;
        this.loading = false;
        this.requestNewResetPasswordLinkSuccess = true;
      }, error => {
        this.toastr.error('Requesting New Password Link failed', error || "Something went wrong", {
          positionClass: "toast-bottom-center",
          tapToDismiss: true,
          timeOut: 10000,
        });
        this.loading = false;
      }
    )
  }

}
