import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-help',
    templateUrl: "./help.component.html"
})
export class HelpComponent implements OnInit {

    links = [
        {
            title: "About Us",
            url: "/help/about-us",
            tooltip: "Learn More About Afrimart",
            icon: "fa fa-suitcase",
            tabindex: "1"
        },
        {
            title: "Success Stories",
            url: "/help/success-stories",
            tooltip: "See success stories from various clients",
            icon: "fa fa-bullseye",
            tabindex: "2"
        },
        {
            title: "Press Release",
            url: "/help/press-release",
            tooltip: "Get latest news from events happening on the Afrimart System",
            icon: "fa fa-folder-open",
            tabindex: "3"
        },
        {
            title: "Advertise With Us",
            url: "/help/advertise-with-us",
            tooltip: "Reach a larger audience by advertising with us",
            icon: "fa fa-bullhorn",
            tabindex: "4"
        },
        {
            title: "Blog",
            url: "/help/blog",
            tooltip: "View writeups from various users and admins of the Afrimart site",
            icon: "fa fa-list-alt",
            tabindex: "5"
        },
        {
            title: "Frequently Asked Questions",
            url: "/help/faq",
            tooltip: "Streamline your queries by reviewing frequently asked questions",
            icon: "fa fa-question",
            tabindex: "6"
        },
        {
            title: "Contact Us",
            url: "/help/contact-us",
            tooltip: "Feel free to reach us for further help, queries and or complaints",
            icon: "fa fa-edit",
            tabindex: "7"
        },
        {
            title: "Suppliers Toolkit",
            url: "/help/suppliers-toolkit",
            tooltip: "Learn more about what it means to be a supplier and achievable actions",
            icon: "fa fa-truck",
            tabindex: "8"
        },
        {
            title: "Terms and Conditions",
            url: "/help/terms-and-conditions",
            tooltip: "Read  up our terms and conditions for various sections of the site",
            icon: "fa fa-magic",
            tabindex: "9"
        },
        {
            title: "Video Guides",
            url: "/help/video-guides",
            tooltip: "Video tutorials on how to perform certain actions",
            icon: "fa fa-video-camera",
            tabindex: "10"
        }
    ]
    setLinkTitle: string;

    constructor() { }

    ngOnInit() {
    }

    setHelpLinkTitle(linkTitle: string) {
        this.setLinkTitle = linkTitle;
    }

    scrollTo(id: string) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }

}
