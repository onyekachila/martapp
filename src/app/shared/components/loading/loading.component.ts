import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input('showSpinner') showSpinner: boolean = true;
  @Input('message') message: string;

  constructor() { }

  ngOnInit() {
  }

}
