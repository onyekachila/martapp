import { Component, OnInit } from '@angular/core';
import { ApplicationUserViewModel } from '../../models/user.model';
import { ProductDto } from '../../models/product.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RequestForQuoteComponent } from '../request-for-quote/request-for-quote.component';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
//import { AngularFireMessaging } from '@angular/fire/messaging';
import { GeneralService } from 'src/app/core/services/general.service';
import { UserService } from 'src/app/core/services/user.service';
import { WishlistComponent } from 'src/app/modules/product/wishlist/wishlist.component';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css']
})
export class RightMenuComponent implements OnInit {

  currUser: ApplicationUserViewModel;
  product: ProductDto = {
    name: ''
  };
  bsModalRef: BsModalRef;
  currentUrl: string = '';
  currentMessage = new BehaviorSubject(null);
  showNewMessageCount: number = 0;

  constructor(
    public userService: UserService,
    private modalService: BsModalService,
    private generalService: GeneralService,
    private router: Router,
  //  private messaging: AngularFireMessaging
  ) {
    this.showHideScrollToTopFunction(0);
    this.generalService.windowpageYOffset.subscribe(pageYOffset => this.showHideScrollToTopFunction(pageYOffset));
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // console.log(this.currentUrl);

      }
    })
  }

  ngOnInit() {
  }


  openRequestForQuoteDialog() {
    const initialState = {
      product: this.product
    };
    this.bsModalRef = this.modalService.show(RequestForQuoteComponent, { initialState });
  }

  checkIfUserLoggedIn() {
    if (!this.userService.checkIfUser()) {
      this.currUser = undefined;
    } else {
      this.currUser = this.userService.getLocalCurrentUserDet();
    }
  }

  openWishlistDialog() {
    this.bsModalRef = this.modalService.show(WishlistComponent);
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  showHideScrollToTopFunction(pageYOffset: number) {
    const x = document.getElementById('scrollToTop');
    // console.log(pageYOffset, x)
    if (x) {
      if (pageYOffset > 200) {
        if (x.style.display === "none") {
          x.style.display = "block";
        }
      } else {
        if (x.style.display === "block") {
          x.style.display = "none";
        }
      }
    }
  }

  /*receivePushMessage() {
    this.messaging.messages
      .subscribe((message) => {
        const xx: any = message;
        // console.log(JSON.stringify(xx));
        this.currentMessage.next(message);
        try {
          if (xx.data.msg_type === 'chat') {
            // console.log(xx.data);
            if (!this.currentUrl.includes('/messaging')) {
              this.showNewMessageCount++;
            } else {
              this.showNewMessageCount = 0;
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
  }*/

}
