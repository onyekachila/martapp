import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from './core/core.module';
//import { ThemeModule } from './core/theme.module';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { TemplateCoreModule } from './core/template-core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
//import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
//import { initializeApp } from 'firebase';
import { ClientModule } from './modules/client.module';
import { SharedModule } from './shared/shared.module';

//import { AngularFireAuthModule } from '@angular/fire/auth';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    TemplateCoreModule.forRoot(),
    ClientModule,
    SharedModule,
    //ThemeModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    //AngularFireAuthModule,
    //AngularFireMessagingModule,
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      tapToDismiss: true,
      // preventDuplicates: true,
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
