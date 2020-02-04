import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';
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


const routes: Routes = [
    {
        path: 'help',
        component: HelpComponent,
        children: [
            {
                path: 'about-us',
                component: AboutUsComponent,
            },
            {
                path: 'success-stories',
                component: SuccessStoriesComponent
            }, 
            {
                path: 'press-release',
                component: PressReleaseComponent
            },
            {
                path: 'advertise-with-us',
                component: AdvertiseWithUsComponent
            },
            {
                path: 'blog',
                component: BlogComponent
            },
            {
                path: 'faq',
                component: FrequentlyAskedQuestionsComponent
            },
            {
                path: 'contact-us',
                component: ContactUsComponent
            },
            {
                path: 'suppliers-toolkit',
                component: SuppliersToolkitComponent
            },
            {
                path: 'terms-and-conditions',
                component: TermsAndConditonsComponent
            },
            {
                path: 'video-guides',
                component: VideoGuidesComponent
            },
            {
                path: "**",
                component: AboutUsComponent,
            }
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HelpRoutingModule { }
