import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public loading: boolean;
  public notSuccessful: boolean = true;

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  requestPasswordReset() {
    this.loading = true;
    this.userService.forgotPassword(this.emailFormControl.value).subscribe(
      data => {
        this.toastr.success('Password reset request sent Successfully!', "Check your mail to change your password", {
          positionClass: "toast-bottom-center",
          tapToDismiss: true,
          timeOut: 10000,
        });
        this.loading = false;
        this.notSuccessful = false;
      },
      error => {
        this.toastr.error('Failed to send request to reset password!', error || "Something went wrong", {
          positionClass: "toast-bottom-center",
          tapToDismiss: true,
          timeOut: 10000,
        });
        this.loading = false;
      }
    );
  }

}
