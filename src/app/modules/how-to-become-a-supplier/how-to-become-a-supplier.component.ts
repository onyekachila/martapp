import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/core/services/utility.service';
import { ExposureLevel, MerchantSubscriptionTypeViewModel } from 'src/app/shared/models/merchant.model';
import { ApplicationUserViewModel } from 'src/app/shared/models/user.model';
import { PaymentViewItem } from 'src/app/shared/models/payment.model';

@Component({
  selector: 'app-how-to-become-a-supplier',
  templateUrl: './how-to-become-a-supplier.component.html',
  styleUrls: ['./how-to-become-a-supplier.component.css']
})
export class HowToBecomeASupplierComponent implements OnInit {

  pageNumber = 0;

  links = [
    {
      title: 'Become a Supplier (Guides)',
      url: 'Guides',
      image: 'assets/images/how-to-become-a-supplier-icons/guide.png',
    },
    {
      title: 'Become a Supplier',
      url: 'SupplierPricing',
      image: 'assets/images/how-to-become-a-supplier-icons/become-supplier.png',
    },
    {
      title: 'About Leads',
      url: 'AboutLeads',
      image: 'assets/images/how-to-become-a-supplier-icons/lead.png',
    },
    {
      title: 'AfriStory',
      url: 'AfriStory',
      image: 'assets/images/how-to-become-a-supplier-icons/afriStory.png',
    }
  ];
  userProfileUpdated: boolean;
  isUserLoggedIn: boolean = this.userService.checkIfUser();
  paymentItemsFetched = false;
  currentMerchantLevel: number;
  currUser: ApplicationUserViewModel;
  percentageProfileUpdated: number;
  paymentItems: MerchantSubscriptionTypeViewModel[];
  exposureLevelEnum: string[] = ExposureLevel;
  processing: boolean;

  constructor(
    public userService: UserService,
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.percentageProfileUpdated = this.userService.getProfileStatusToBecomeAMerchantInPercentage();
    this.userProfileUpdated = this.userService.checkIfUserInfoUpdated();
    this.getMerchantPaymentItems();
    if (this.userService.checkIfUser()) {
      this.currUser = this.userService.getLocalCurrentUserDet();
      if (this.currUser && this.currUser.CurrentSubscription) {
        this.currentMerchantLevel = this.currUser.CurrentSubscription.SubscriptionTypeId;
      }
    }
  }

  getMerchantPaymentItems() {
    try {
      this.paymentItems = JSON.parse(localStorage.afrimartMerchantPaymentItems);
    } catch (error) {
    // tslint:disable-next-line:align
    } this.paymentService.getMerchantPaymentItems().subscribe(
      data => {
       // this.paymentItems = data;
        // console.log(data)
      }
    );
  }

  apply(paymentItem: PaymentViewItem) {
    if (!paymentItem) {
      this.processing = true;
      this.userService.BecomeMerchant('').subscribe(
        () => {
          this.processing = false;
          // tslint:disable-next-line:max-line-length
          this.toastr.success('You may have to Logout and Login to access your supplier dashboard', 'Free Supplier Subscription Activated Successfully!', {
            positionClass: 'toast-bottom-center',
            tapToDismiss: true,
            timeOut: 10000
          });
        }, error => {
          this.processing = false;
          this.toastr.error('Supplier Subscription Failed!', error || 'Something went wrong', {
            positionClass: 'toast-bottom-center',
            tapToDismiss: true,
            timeOut: 10000,
          });
        }
      )
    } else {
      localStorage.afrimartPreviousUrl = window.location.href;
      const url = this.utilityService.getBaseUrl().replace("#", "") + "/afrimartpay/#/supplier-subscription/" + paymentItem.Id;
      // console.log(url);
      window.location.href = url;
    }
  }

  scrollTo(id: string) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
  // tslint:disable-next-line:variable-name
  goToPage(number: number) {
    this.pageNumber = number;
  }
  next() {
    this.pageNumber += 1;
  }
  prev() {
    this.pageNumber -= 1;
  }


}
