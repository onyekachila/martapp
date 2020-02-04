import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessagingService } from 'src/app/core/services/messaging.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  operationstime = [
    {
      time: " 9am - 6pm",
      day: "Monday"
    },
    {
      time: " 9am - 6pm",
      day: "Tuesday"
    },
    {
      time: " 9am - 6pm",
      day: "Wednesday"
    },
    {
      time: " 9am - 6pm",
      day: "Thursday"
    },
    {
      time: " 9am - 6pm",
      day: "Friday"
    },
    {
      time: " 11am - 4pm",
      day: "Saturday"
    },
    {
      time: " Closed",
      day: "Sunday"
    }
  ]

  socialmedias = [
    {
      icon: "facebook",
      link: "https://www.facebook.com/Afrimarttrade"
    },
    {
      icon: "twitter",
      link: "https://twitter.com/afrimarttrade"
    },
    {
      icon: "linkedin",
      link: "https://www.linkedin.com/company/afrimarttrade"
    },
    {
      icon: "youtube",
      link: "https://www.youtube.com/channel/UCZw5GVw25zC7hb7nY1LISig"
    },
    {
      icon: "instagram",
      link: "https://www.instagram.com/afrimarttrade/"
    }
  ];
  contactForm: FormGroup;
  loading: boolean;
  message: {
    type: string,
    text: string
  }

  constructor(private fb: FormBuilder, private messageService: MessagingService) {
    this.contactForm = this.fb.group({
      'UserName': ['', Validators.required],
      'Email': ['', Validators.compose([Validators.required, Validators.email])],
      'Title': ['', Validators.required],
      'Message': ['', Validators.required],
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0)
  }

  contactUs() {
    this.loading = true;
    this.message = undefined;
    this.messageService.contactUs(this.contactForm.value).subscribe(
      () => {
        this.loading = false;
        this.contactForm.reset();
        this.message = {
          text: 'Message sent',
          type: 'success'
        }

      }, err => {
        this.message = {
          type: 'error',
          text: err || err.message || err.Message || 'An error occured'
        }
        this.loading = false
      }
    )
  }

}
