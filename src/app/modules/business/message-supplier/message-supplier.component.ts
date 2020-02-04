import { Component, OnInit } from '@angular/core';
import { VendorDto } from 'src/app/shared/models/store.model';
import { UserService } from 'src/app/core/services/user.service';
//import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-message-supplier',
  templateUrl: './message-supplier.component.html',
  styleUrls: ['./message-supplier.component.css']
})
export class MessageSupplierComponent implements OnInit {

  senderId;
  newMessage: string;
  errorMessage: string;
  messageSending: boolean;
  maxLength = 2048;
  isUserLoggedIn: boolean;
  store: VendorDto;

  constructor(
    private userService: UserService,
    //private authService: AuthenticationService,
    private messagingService: MessagingService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    /*const currUser = this.authService.getLocalCurrentUser();
    if (currUser) {
      this.getUserApplicationId();
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }*/
  }


  getUserApplicationId() {
    const data = this.userService.getLocalCurrentUserDet();
    if (data) {
      this.senderId = data.ApplicationUserId;
    } else {
      this.userService.getLoggedInUserDetails().subscribe(
        data => {
         // this.senderId = data.ApplicationUserId;
        }
      );
    }
  }

  sendMessage() {
    if (this.newMessage) {
      if (this.newMessage.trim().length > 1) {
        this.errorMessage = undefined;
        this.messageSending = true;
        this.messagingService.postMessageToStore(this.newMessage, this.store.StoreGuid).subscribe(
          data => {
            this.toastr.success(`Supplier: ${this.store.name}`, "Message Sent");
            this.messageSending = false;
            this.newMessage = undefined;
            this.closeModal();
            this.messagingService.refreshContacts.emit();
          },
          error => {
            this.errorMessage = error || "An error occured!";
            this.messageSending = false;
          }
        );
      }
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
