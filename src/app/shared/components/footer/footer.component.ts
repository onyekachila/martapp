import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmailSubscriptionUpdateModel } from '../../models/email-subscriptions.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public userService: UserService, private toastr: ToastrService) { }

  loading: boolean;

  emailFormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
  }


  subscribeForNewsLetter() {
    this.loading = true;
    const body: EmailSubscriptionUpdateModel = new EmailSubscriptionUpdateModel();
    body.Email = this.emailFormControl.value;
   /* this.userService.subscribeForEmailNotifications(body).subscribe(
      () => {
        this.loading = false;
        this.toastr.success('Successfully subscribed for our newsletter');
        this.emailFormControl.setValue(null);
      }, error => {
        this.loading = false;
        this.toastr.error(error.message || error.Message || error || 'Something went wrong');
      }
    );*/
  }

}
