import { Component } from '@angular/core';
import { UtilityService } from './core/services/utility.service';
import { UserService } from './core/services/user.service';
import { ThemeChangerService } from './shared/themes/theme-changer.service';
//import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from './configs/app-settings.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Afrimart';
  currentMessage = new BehaviorSubject(null);
  currentUrl: string;

  // tslint:disable-next-line:max-line-length
  constructor(private utilityService: UtilityService, public userService: UserService,
    // private authService: AuthenticationService,
     public global: ThemeChangerService,
              private toastrService: ToastrService, private router: Router) {
    if (this.userService.checkIfUser()) {
     // this.authService.getPermission();
    }
    this.changeTheme(AppSettings.themeColor);
    this.global.themeChangeEmitter.subscribe(theme => this.changeTheme(theme));
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        // console.log(this.currentUrl);

      }
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.utilityService.getAndSetCurrencyExchangeRate();
   // this.receivePushMessage();
  }

  changeTheme(theme: any) {
    console.log('Now Changing theme to ' + theme);
    this.global.set('theme', theme);
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
              // tslint:disable-next-line:max-line-length
              this.toastrService.info(`${xx.data.message.substring(0, 100)}...`, `New message from ${xx.data.senderName}`, { timeOut: 10000, closeButton: true });
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
  }*/
}
