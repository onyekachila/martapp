import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { PressReleaseComponent } from './press-release/press-release.component';
import { AdvertiseWithUsComponent } from './advertise-with-us/advertise-with-us.component';
import { BlogComponent } from './blog/blog.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SuppliersToolkitComponent } from './suppliers-toolkit/suppliers-toolkit.component';
import { TermsAndConditonsComponent } from './terms-and-conditons/terms-and-conditons.component';
import { VideoGuidesComponent } from './video-guides/video-guides.component';
import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AccordionModule.forRoot()
  ],
  declarations: [HelpComponent, AboutUsComponent, SuccessStoriesComponent, PressReleaseComponent, AdvertiseWithUsComponent, BlogComponent, FrequentlyAskedQuestionsComponent, ContactUsComponent, SuppliersToolkitComponent, TermsAndConditonsComponent, VideoGuidesComponent]
})
export class HelpModule { }
