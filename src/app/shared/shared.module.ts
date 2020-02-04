import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RightMenuComponent } from './components/right-menu/right-menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { RouterModule } from '@angular/router';
import { RequestForQuoteComponent } from './components/request-for-quote/request-for-quote.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from './pipes/pipes.module';
import { RequestForQuoteBannerComponent } from './components/request-for-quote-banner/request-for-quote-banner.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),

    PipesModule
  ],
  declarations: [HeaderComponent, FooterComponent, RightMenuComponent, RequestForQuoteComponent, RequestForQuoteBannerComponent, SectionTitleComponent, LoadingComponent],
  exports: [HeaderComponent, FooterComponent, RightMenuComponent, RequestForQuoteComponent, RequestForQuoteBannerComponent, SectionTitleComponent, LoadingComponent],
  entryComponents: [RequestForQuoteComponent]
})
export class SharedModule { }
