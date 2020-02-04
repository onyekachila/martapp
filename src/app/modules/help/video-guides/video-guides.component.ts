import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-guides',
  templateUrl: './video-guides.component.html',
  styleUrls: ['./video-guides.component.css']
})
export class VideoGuidesComponent implements OnInit {

  videos = [
    {
      title: "Request For Quotes",
      link: "https://afrimart.com/shared/portal/howtos/request_for_quotes.mp4",

    },
    {
      title: "Leads",
      link: "https://afrimart.com/shared/portal/howtos/leads.mp4",

    },
    {
      title: "Registration",
      link: "https://afrimart.com/shared/portal/howtos/registration.mp4",

    },
    {
      title: "Regular Sign In",
      link: "https://afrimart.com/shared/portal/howtos/login_normal.mp4",

    },
    {
      title: "Facebook Sign In",
      link: "https://afrimart.com/shared/portal/howtos/login_fb.mp4",

    },
    {
      title: "Google Sign In",
      link: "https://afrimart.com/shared/portal/howtos/login_google.mp4",

    },
    {
      title: "Forgot Password",
      link: "https://afrimart.com/shared/portal/howtos/forgot_password.mp4",

    },
    {
      title: "Reset Password",
      link: "https://afrimart.com/shared/portal/howtos/reset_password.mp4",

    },
    {
      title: "Change Password",
      link: "https://afrimart.com/shared/portal/howtos/change_password.mp4",

    },
    {
      title: "Suppliers Dashboard",
      link: "https://afrimart.com/shared/portal/howtos/suppliers_dashboard.mp4",

    },
    {
      title: "Create a Store",
      link: "https://afrimart.com/shared/portal/howtos/create_store.mp4",

    },
    {
      title: "Send a Message",
      link: "https://afrimart.com/shared/portal/howtos/messaging.mp4",

    },
    {
      title: "Update Profile",
      link: "https://afrimart.com/shared/portal/howtos/update_profile.mp4",

    },
    {
      title: "Become a Supplier",
      link: "https://afrimart.com/shared/portal/howtos/become_a_merchant.mp4",

    }
  ]


  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

}
