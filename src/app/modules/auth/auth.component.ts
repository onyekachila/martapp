import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/configs/app-settings.config';

@Component({
  selector: 'app-auth',
  templateUrl: "./auth.component.html"
})
export class AuthComponent implements OnInit {

  Content: { heading: string; body: string; subTexts: string[] } = AppSettings.loginRegistrationContent;

  constructor() { }

  ngOnInit() {
  }

}
