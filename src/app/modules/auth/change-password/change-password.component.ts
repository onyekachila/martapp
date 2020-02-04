import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  loading: boolean;
  viewPassword: boolean = false;
  opasswordFormControl = new FormControl({ value: null, disabled: this.loading }, [
    Validators.required,
  ]);

  passwordFormControl = new FormControl({ value: null, disabled: this.loading }, [
    Validators.required,
  ]);

  cpasswordFormControl = new FormControl({ value: null, disabled: this.loading }, [
    Validators.required,
  ]);


  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  changePassword() {
    this.loading = true;
    this.userService.changePassword({ ConfirmPassword: encodeURI(this.cpasswordFormControl.value), OldPassword: encodeURI(this.opasswordFormControl.value), NewPassword: encodeURI(this.passwordFormControl.value) }).subscribe(
      data => {
        this.loading = false;
        this.toastr.success('Password Changed Successfully!', "Login with new password to proceed", {
          positionClass: "toast-bottom-right",
          tapToDismiss: true,
          timeOut: 10000,
          progressBar: true
        });
        this.userService.logout().then();
      },
      error => {
        this.toastr.error(error || error.Message || "Something went wrong", "", {
          positionClass: "toast-bottom-right",
          tapToDismiss: true,
          timeOut: 10000,
          progressBar: true
        });
        this.loading = false;
      }
    )
  }

}
