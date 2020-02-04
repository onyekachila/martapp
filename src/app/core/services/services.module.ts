import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralService } from './general.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { UserService } from './user.service';
import { ProductService } from './product.service';
import { StoreService } from './store.service';
import { CategoryService } from './category.service';
import { UtilityService } from './utility.service';
import { InvoiceService } from './invoice.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentService } from './payment.service';
import { LogisticsService } from './logistics.service';
import { MessagingService } from './messaging.service';
//import { AngularFireModule } from '@angular/fire';
//import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { WishlistService } from './wishlist.service';
import { CartService } from './cart.service';
import { firebaseConfig } from 'src/environments/firebase.config';
//import { AngularFireAuthModule } from '@angular/fire/auth';
//import { ThemeChangerService } from '../themes/theme-changer.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
   // AngularFireMessagingModule,
   // AngularFireModule.initializeApp(firebaseConfig),
   // AngularFireAuthModule,
  ],
  declarations: [],
  providers: [
    GeneralService,
    //AuthenticationService,
    UserService,
    ProductService,
    StoreService,
    CategoryService,
    UtilityService,
    InvoiceService,
    PaymentService,
    LogisticsService,
    MessagingService,
    WishlistService,
    CartService,
    //ThemeChangerService
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServicesModule,
    };
  }
}
